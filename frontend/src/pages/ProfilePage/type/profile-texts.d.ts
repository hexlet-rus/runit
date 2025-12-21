export interface LegalStatusTexts {
  lawDocuments: string[];
  lawStatus: string;
  data: string;
  acceptedRegistration: string;
  yes: string;
  no: string;
}

export interface AvatarUploadTexts {
  avatarUser: string;
}

export interface UserInfoCardTexts {
  edit: string;
}

export interface ContactsCardTexts {
  contacts: string;
  connect: string;
  disconnect: string;
  confirmed: string;
  notConfirmed: string;
}

export interface ConnectionsCardTexts {
  title: string;
  status: string;
  connected: string;
  disconnect: string;
  confirm: string;
  disable: string;
  connect: string;
}

export interface NotificationsCardTexts {
  title: string;
  receiveNews: string;
}

export interface LanguageCardTexts {
  language: string;
  currentLanguage: string;
}


export interface NotificationMessages {
  tooBigFile: string;
  networkError: string;
  isSucessAvatar: string;
  telegramConnect: string;
  telegramDisconnect: string;
  emailConfirm: string;
  subscription: {
    news: string;
    email: string;
    telegram: string;
    isEmailVerified: string;
    isTelegramConnected: string;
  },
  unSubscription: {
    news: string;
    email: string;
    telegram: string;
    isEmailVerified: string;
    isTelegramConnected: string;
  },
  error: {
    networkError: string;
    failedPerform: string;
  }
}

export interface NotificationTitles {
  success: string;
  error: string;
}

export interface NotificationTexts {
  title: NotificationTitles;
  message: NotificationMessages;
}



export interface ProfilePageProps {
  components: {
    legalStatus: LegalStatusTexts;
    avatarUpload: AvatarUploadTexts;
    userInfoCard: UserInfoCardTexts;
    contactsCard: ContactsCardTexts;
    connectionsCard: ConnectionsCardTexts;
    notificationsCard: NotificationsCardTexts;
    languageCard: LanguageCardTexts;
  };
  notificationsText: NotificationTexts;
}