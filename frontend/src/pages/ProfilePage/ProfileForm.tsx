import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
    Paper,
    Stack,
    Flex,
} from '@mantine/core';
import AvatarUpload from './AvatarUploadProps';
import LegalStatus from './LegalStatus';
import UserInfoCard from './UserInfoCard';
import ContactsCard from './ContactsCard';
import ConnectionsCard from './ConnectionsCard';
import NotificationsCard from './NotificationsCard';
import LanguageCard from './LanguageCard';
import { useMediaQuery } from '@mantine/hooks';
import { ProfilePageProps } from './type/profile-texts'
import { notification } from './utils/utils'

const dataUser = {
    name: 'Иван Петров',
    isLawStatus: true,
    dateLawStatus: '01.01.2025',
    email: 'ivan@example.com',
    isEmailVerified: false,
    isTelegramConnected: false,
    language: 'Русский',
    notifications: {
        news: false,
        email: false,
        telegram: false,
    }
}

interface ProfileFormValues {
    name: string;
    email: string;
    language: string;
    notifications: {
        news: boolean;
        email: boolean;
        telegram: boolean;
    };
}

const initialValues: ProfileFormValues = {
    name: dataUser.name,
    email: dataUser.email,
    language: dataUser.language,
    notifications: dataUser.notifications,
};

export type NotificationField = 'news' | 'email' | 'telegram';

const ProfileForm = (
    { components,
        notificationsText
    }: ProfilePageProps) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(dataUser.isEmailVerified);
    const [isTelegramConnected, setIsTelegramConnected] = useState<boolean>(dataUser.isTelegramConnected);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pendingField, setPendingField] = useState<NotificationField[]>([]);

    const form = useForm<ProfileFormValues>({
        initialValues,

        validate: {
            name: (value) => value.trim().length < 2 ? 'Имя слишком короткое' : null,
            email: (value) => !/^\S+@\S+$/.test(value) ? 'Неверный формат email' : null,
        },

        validateInputOnChange: true,
    });



    const handleNotificationChange = async (
        fieldName: keyof ProfileFormValues['notifications'],
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (isLoading) return;

        const newValue = event.currentTarget.checked;
        const oldValue = form.values.notifications[fieldName];

        // Оптимистичное обновление
        form.setFieldValue(`notifications.${fieldName}`, newValue);
        setPendingField(prev => [...prev, fieldName]);
        setIsLoading(true);

        try {
            const result = await sendRequestForSubscription(fieldName, newValue);

            if (result.success) {
                notification(notificationsText.title.success, result.message, true);
            } else {
                // Откат при ошибке
                form.setFieldValue(`notifications.${fieldName}`, oldValue);
                notification(notificationsText.title.error, result.message, false);
            }
        } catch (error) {
            // Откат при ошибке сети
            form.setFieldValue(`notifications.${fieldName}`, oldValue);
            notification(notificationsText.title.error, notificationsText.message.networkError, false);
        } finally {
            setIsLoading(false);
            setPendingField(prev => prev.filter(field => field !== fieldName));
        }
    };
    interface SubscriptionResult {
        success: boolean;
        message: string;
    }
    const sendRequestForSubscription = async (
        fieldName: string,
        isSubscription: boolean
    ): Promise<SubscriptionResult> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const isSuccess = true;
        const error = Math.random() < 0.3;
        console.log(error)
        if (error) { console.log('NetworkError') }
        return {
            success: isSuccess,
            message: isSubscription
                ? notificationsText.message.subscription[fieldName]
                : notificationsText.message.unSubscription[fieldName]
                // ? `Во подписаны на уведосления в "${fieldName}" обновлена`
                // : `Подписка по "${fieldName}" отменена`,
        };
    };
    const isWrap = useMediaQuery('(max-width: 650px)');

    const handleConfirmEmail = () => {
        setIsEmailVerified(value => !value)
        console.log('Подтверждение email');
    };

    const handleToggleTelegram = () => {
        setIsTelegramConnected(value => !value)
        console.log('Переключение Telegram');
    };
    const handleFileChange = (selectedFile: File | null) => {
        try {
            if (selectedFile.size > 5 * 1024 * 1024) {
                notification(notificationsText.title.error, notificationsText.message.tooBigFile, false)
                return;
            }
            setAvatarFile(selectedFile);
            if (selectedFile) {
                const url = URL.createObjectURL(selectedFile);
                setAvatarUrl(url);
                notification(notificationsText.title.success, notificationsText.message.isSucessAvatar, true)
            }
        } catch (error) {
            notification(notificationsText.title.error, notificationsText.message.networkError, false)
        }
    };


    const handleNewsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleNotificationChange('news', event);
    };

    const handleEmailNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleNotificationChange('email', event);
    };

    const handleTelegramNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleNotificationChange('telegram', event);
    };
    const handleChangeLanguage = () => {
        // Реализация смены языка
        console.log('Смена языка');
    };

    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);


    return (
        <Flex gap="md" wrap={isWrap ? 'wrap' : 'nowrap'}>
            <Flex direction={isWrap ? "row" : 'column'} style={isWrap && { flexGrow: 1 }} wrap={isWrap ? 'wrap' : 'nowrap'} gap="md">
                <UserInfoCard
                    userName={dataUser.name}
                    isWrap={isWrap}
                    textData={components.userInfoCard}
                >
                    <AvatarUpload
                        avatarUrl={avatarUrl}
                        onFileChange={handleFileChange}
                        userName={dataUser.name}
                        textData={components.avatarUpload}
                    />
                </UserInfoCard>
                <Paper radius='lg' shadow='sm' p='md' style={isWrap && { flexGrow: 1 }}>
                    <LegalStatus
                        isLawStatus={dataUser.isLawStatus}
                        dateLawStatus={dataUser.dateLawStatus}
                        textData={components.legalStatus}
                    />
                </Paper>
            </Flex>
            <Stack >
                <ContactsCard
                    email={dataUser.email}
                    isEmailVerified={isEmailVerified}
                    isTelegramConnected={isTelegramConnected}
                    textData={components.contactsCard}
                />
                <ConnectionsCard
                    isEmailVerified={isEmailVerified}
                    isTelegramConnected={isTelegramConnected}
                    onConfirmEmail={handleConfirmEmail}
                    onToggleTelegram={handleToggleTelegram}
                    textData={components.connectionsCard}
                />
                <NotificationsCard
                    onNewsChange={handleNewsChange}
                    onEmailNotificationsChange={handleEmailNotificationsChange}
                    onTelegramNotificationsChange={handleTelegramNotificationsChange}
                    notifications={form.values.notifications}
                    textData={components.notificationsCard}
                    loading={isLoading}
                    pendingNotification={pendingField}
                />
                <LanguageCard
                    currentLanguage={dataUser.language}
                    onChangeLanguage={handleChangeLanguage}
                    textData={components.languageCard}
                />
            </Stack>
        </Flex>)
}

export default ProfileForm