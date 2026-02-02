import { useState, useEffect, useCallback } from 'react';
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
import { showNotification, makeSendRequestForSubscription } from './utils/utils'
import { useNotificationToggle } from './hooks/useNotificationToggle';
import { NotificationField } from './types/notification';
import { profilePageProps } from "./data/mock-data";
import { ProfileFormValues } from "./types/components";
import { useTRPCClient } from '../../utils/trpc';




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


const initialValues: ProfileFormValues = {
    name: dataUser.name,
    email: dataUser.email,
    language: dataUser.language,
    notifications: dataUser.notifications,
    isEmailVerified: dataUser.isEmailVerified,
    isTelegramConnected: dataUser.isTelegramConnected,
};

const ProfileForm = () => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { components, notificationsText } = profilePageProps;
    const form = useForm<ProfileFormValues>({
        initialValues,
    });

    const trpcClient = useTRPCClient();

    trpcClient.users.getAllUsers.query().then((result) => {
        console.log(result)
    })

    const isWrap = useMediaQuery('(max-width: 720px)');

    const handleFileChange = (selectedFile: File | null) => {
        try {
            if (selectedFile.size > 5 * 1024 * 1024) {
                showNotification(notificationsText.title.error, notificationsText.message.tooBigFile, false)
                return;
            }
            setAvatarFile(selectedFile);
            if (selectedFile) {
                const url = URL.createObjectURL(selectedFile);
                setAvatarUrl(url);
                showNotification(notificationsText.title.success, notificationsText.message.isSucessAvatar, true)
            } else {
                setAvatarUrl(null);
            }
        } catch (error) {
            showNotification(notificationsText.title.error, notificationsText.message.networkError, false)
        }
    };

    const sendRequestForSubscription = useCallback(makeSendRequestForSubscription(notificationsText), [notificationsText])

    const {
        isLoading,
        pendingField,
        toggleField,
        cancelAllRequests,
        isPending
    } = useNotificationToggle({
        onUpdateForm: (fieldName, value) => {
            if (fieldName === 'isEmailVerified' || fieldName === 'isTelegramConnected') {
                form.setFieldValue(fieldName, value);
            } else {
                form.setFieldValue(`notifications.${fieldName}`, value);
            }
        },
        sendRequest: sendRequestForSubscription,
        onSuccess: (message) => {
            showNotification(notificationsText.title.success, message, true);
        },
        onError: (message) => {
            showNotification(notificationsText.title.error, message, false);
        },
    });

    const handleNotificationChange = (
        fieldName: NotificationField,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = event.currentTarget.checked;
        const oldValue = form.values.notifications[fieldName];
        toggleField(fieldName, oldValue, newValue);
    };

    const handleConfirmEmail = () => {
        const oldValue = form.values.isEmailVerified;
        const newValue = !oldValue;
        toggleField('isEmailVerified', oldValue, newValue);
    };

    const handleToggleTelegram = () => {
        const oldValue = form.values.isTelegramConnected;
        const newValue = !oldValue;
        toggleField('isTelegramConnected', oldValue, newValue);
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
        console.log('Смена языка');
    };

    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
            cancelAllRequests();
        };
    }, [avatarUrl, cancelAllRequests]);


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
                    isEmailVerified={form.values.isEmailVerified}
                    isTelegramConnected={form.values.isTelegramConnected}
                    textData={components.contactsCard}
                    pendingActions={{
                        emailVerification: isPending('isEmailVerified'),
                        telegramConnection: isPending('isTelegramConnected'),
                    }}
                />
                <ConnectionsCard
                    isEmailVerified={form.values.isEmailVerified}
                    isTelegramConnected={form.values.isTelegramConnected}
                    onConfirmEmail={handleConfirmEmail}
                    onToggleTelegram={handleToggleTelegram}
                    textData={components.connectionsCard}
                    loading={isLoading}
                    pendingActions={{
                        emailVerification: isPending('isEmailVerified'),
                        telegramConnection: isPending('isTelegramConnected'),
                    }}
                />
                <NotificationsCard
                    onNewsChange={handleNewsChange}
                    onEmailNotificationsChange={handleEmailNotificationsChange}
                    onTelegramNotificationsChange={handleTelegramNotificationsChange}
                    notifications={form.values.notifications}
                    textData={components.notificationsCard}
                    loading={isLoading}
                    pendingNotification={pendingField.filter(field =>
                        ['news', 'email', 'telegram'].includes(field)
                    ) as NotificationField[]}
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