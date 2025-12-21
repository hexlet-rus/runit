import { notifications } from '@mantine/notifications';
import { NotificationTexts } from '../type/profile-texts'
import { ToggleField } from '../type/notification';

export const showNotification = (title: string, message: string, isSuccess: boolean): void => {
    notifications.show({
        title,
        message,
        color: isSuccess ? 'teal' : 'red',
        position: 'top-center',
        autoClose: 1500
    });
}

export const makeSendRequestForSubscription = (notificationsText: NotificationTexts) => async (
    fieldName: ToggleField,
    isSubscription: boolean
) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isSuccess = Math.random() < 0.7;
    const error = Math.random() < 0.3;

    if (error) {
        throw Error(notificationsText.message.error.networkError)
    }

    const message = isSubscription
        ? notificationsText.message.subscription[fieldName]
        : notificationsText.message.unSubscription[fieldName];

    if (isSuccess) {
        return {
            success: isSuccess,
            message
        };
    } else {
        return {
            success: isSuccess,
            message: notificationsText.message.error.failedPerform,
        }
    }
};
