

export interface SubscriptionResult {
    success: boolean;
    message: string;
}

export type NotificationField = 'news' | 'email' | 'telegram';
export type ConnectionField = 'isEmailVerified' | 'isTelegramConnected';
export type ToggleField = NotificationField | ConnectionField;

export interface NotificationToggleOptions {
    onUpdateForm: (fieldName: ToggleField, value: boolean) => void;
    sendRequest: (fieldName: ToggleField, isSubscription: boolean) => Promise<{
        success: boolean;
        message: string;
    }>;
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

export interface NotificationsState {
    news: boolean;
    email: boolean;
    telegram: boolean;
}

