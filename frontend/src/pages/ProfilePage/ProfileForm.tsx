import { useState, useEffect } from 'react';
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
type NotificationState = {
    news: boolean;
    email: boolean;
    telegram: boolean;
};

const ProfileForm = (
    { components,
        notificationsText
    }: ProfilePageProps) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(dataUser.isEmailVerified);
    const [isTelegramConnected, setIsTelegramConnected] = useState<boolean>(dataUser.isTelegramConnected);
    const [notificationState, setNotificationState] = useState<NotificationState>(dataUser.notifications)
    
    const setNotificationFieldInState = (fieldName: keyof NotificationState) =>{
        setNotificationState((state) => {
            return {
                ...state,
                [fieldName]: !state[fieldName]
            }
        })
    } 
    interface SubscriptionResult {
    success: boolean;
    message: string;
   }
    const sendRequestForSubscription = async (subcription:string):Promise<SubscriptionResult> =>{
        return {
            success:true,
            message:`${subcription}`
        }
    }
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

    const handleNewsChange = (event) => {

        setNotificationFieldInState('news')
        console.log('Новости сервиса:', event.currentTarget.checked);
    };

    const handleEmailNotificationsChange = (event) => {
        setNotificationFieldInState('email')
        console.log('Email уведомления:', event.currentTarget.checked);
    };

    const handleTelegramNotificationsChange = (event) => {
        setNotificationFieldInState('telegram')
        console.log('Telegram уведомления:', event.currentTarget.checked);
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
            <Stack>
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
                    notifications={notificationState}
                    textData={components.notificationsCard}
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