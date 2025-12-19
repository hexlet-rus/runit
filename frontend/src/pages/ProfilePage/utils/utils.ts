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