import { useState, useCallback, useRef } from 'react';
import {  NotificationToggleOptions,
    ToggleField
    } from '../types/notification';


export const useNotificationToggle = ({
    onUpdateForm,
    sendRequest,
    onSuccess,
    onError,
}: NotificationToggleOptions) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pendingField, setPendingField] = useState<ToggleField[]>([]);
    const abortControllers = useRef<Map<ToggleField, AbortController>>(new Map());

    const toggleField = useCallback(async (
        fieldName: ToggleField,
        oldValue: boolean,
        newValue: boolean
    ) => {
        if (isLoading || pendingField.includes(fieldName)) return;

        if (abortControllers.current.has(fieldName)) {
            abortControllers.current.get(fieldName)?.abort();
        }

        const abortController = new AbortController();
        abortControllers.current.set(fieldName, abortController);

        onUpdateForm(fieldName, newValue);
        setPendingField(prev => [...prev, fieldName]);
        setIsLoading(true);

        try {
            const result = await sendRequest(fieldName, newValue);
                        
            if (abortController.signal.aborted) return;

            if (result.success) {
                onSuccess(result.message);
            } else {
                onUpdateForm(fieldName, oldValue);
                onError(result.message);
            }
        } catch (error) {

            if (abortController.signal.aborted) return;
            
            onUpdateForm(fieldName, oldValue);
            onError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            if (!abortController.signal.aborted) {
                setIsLoading(false);
                setPendingField(prev => prev.filter(field => field !== fieldName));
                abortControllers.current.delete(fieldName);
            }
        }
    }, [isLoading, pendingField, onUpdateForm, sendRequest, onSuccess, onError]);

 
    const cancelAllRequests = useCallback(() => {
        abortControllers.current.forEach(controller => controller.abort());
        abortControllers.current.clear();
        setPendingField([]);
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        pendingField,
        toggleField,
        cancelAllRequests,
        isPending: (fieldName: ToggleField) => pendingField.includes(fieldName),
    };
};
