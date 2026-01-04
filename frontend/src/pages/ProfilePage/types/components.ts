import { 
    AvatarUploadTexts,
    ConnectionsCardTexts,
    ContactsCardTexts,
    LanguageCardTexts,
    LegalStatusTexts,
    UserInfoCardTexts,
    NotificationsCardTexts
 } from './profile-texts'
import { NotificationField} from './notification';

import { ReactNode } from 'react';
 
export interface AvatarUploadProps {
    avatarUrl: string | null;
    onFileChange: (file: File | null) => void;
    userName: string;
    textData: AvatarUploadTexts
}

export interface ConnectionsCardProps {
    isEmailVerified: boolean;
    isTelegramConnected: boolean;
    onConfirmEmail: () => void;
    onToggleTelegram: () => void;
    textData: ConnectionsCardTexts;
    loading?: boolean;
    pendingActions?: {
        emailVerification: boolean;
        telegramConnection: boolean;
    };
}

export interface ContactsCardProps {
    email: string;
    isEmailVerified: boolean;
    isTelegramConnected: boolean;
    textData: ContactsCardTexts;
    pendingActions?: {
        emailVerification: boolean;
        telegramConnection: boolean;
    };
}

export type TabItem = {
    id: number,
    valueName: string;
    title: string;
    children: React.ReactNode;
}

export interface TabsSwitcherProp {
    tabs: TabItem[]
}

export interface LanguageCardProps {
  currentLanguage: string;
  onChangeLanguage: () => void;
  textData:LanguageCardTexts;
}

export interface LegalStatusProps {
    isLawStatus: boolean;
    dateLawStatus: string;
    textData: LegalStatusTexts
}

export interface  UserInfoCardProps {
  userName: string;
  isWrap: boolean;
  children?: ReactNode;
  textData: UserInfoCardTexts
}

export interface NewsServiceCheckboxProps {
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    isLoading:boolean;
}

export interface NotificationsCardProps {
    onNewsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTelegramNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    notifications: {
        news: boolean;
        email: boolean;
        telegram: boolean;
    }
    textData: NotificationsCardTexts;
    loading: boolean;
    pendingNotification: NotificationField[]
}

export interface NotificationChannelProps {
    label: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    isLoading: boolean;
}

export interface ConnectionItemProps {
    label: string;
    status: string;
    showButton: boolean;
    buttonText: string;
    onButtonClick: () => void;
    textData: string;
    loading?: boolean;
    disabled?: boolean;
}

export interface ProfileFormValues {
    name: string;
    email: string;
    language: string;
    isEmailVerified: boolean;
    isTelegramConnected: boolean;
    notifications: {
        news: boolean;
        email: boolean;
        telegram: boolean;
    };
}