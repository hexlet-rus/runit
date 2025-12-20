import { notifications } from '@mantine/notifications';

export const notification = (title: string, message: string, isSuccess:boolean): void => {
    notifications.show({
        title,
        message,
        color: isSuccess ? 'teal' : 'red',
        position: 'top-center',
        autoClose: 1500
    });
}

    // const handleNotificationChange = (
    //     isLoading:any, 
    //     form:any,
    //     setIsLoading:any,
    //     setPendingField:any,
    //     notificationsText: any,
    // ) => async (
    //     fieldName: 'news' | 'email' | 'telegram',
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     if (isLoading) return;

    //     const newValue = event.currentTarget.checked;
    //     const oldValue = form.values.notifications[fieldName];

    //     // Оптимистичное обновление
    //     form.setFieldValue(`notifications.${fieldName}`, newValue);
    //     setPendingField(prev => [...prev, fieldName]);
    //     setIsLoading(true);

    //     try {
    //         const result = await sendRequestForSubscription(fieldName, newValue);

    //         if (result.success) {
    //             notification(notificationsText.title.success, result.message, true);
    //         } else {
    //             // Откат при ошибке
    //             form.setFieldValue(`notifications.${fieldName}`, oldValue);
    //             notification(notificationsText.title.error, result.message, false);
    //         }
    //     } catch (error) {
    //         // Откат при ошибке сети
    //         form.setFieldValue(`notifications.${fieldName}`, oldValue);
    //         notification(notificationsText.title.error, notificationsText.message.networkError, false);
    //     } finally {
    //         setIsLoading(false);
    //         setPendingField(prev => prev.filter(field => field !== fieldName));
    //     }
    // };
    // interface SubscriptionResult {
    //     success: boolean;
    //     message: string;
    // }
    // const sendRequestForSubscription => async (
    //     fieldName: string,
    //     isSubscription: boolean,
     
    // ): Promise<SubscriptionResult> => {
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     const isSuccess = true;
    //     const error = Math.random() < 0.3;
    //     console.log(error)
    //     if (error) { console.log('NetworkError') }
    //     return {
    //         success: isSuccess,
    //         message: isSubscription
    //             ? notificationsText.message.subscription[fieldName]
    //             : notificationsText.message.unSubscription[fieldName]
    //     };
    // };