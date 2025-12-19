import { ProfilePageProps } from "../type/profile-texts"
export const profilePageProps: ProfilePageProps = {
    components: {
        legalStatus: {
            lawDocuments: [
                "Условия использования",
                "Соглашение об обработке ПД",
                "Политика обработки данных",
                "Использование Cookie-файлов"
            ],
            lawStatus: "Правовой статус",
            data: "Дата",
            acceptedRegistration: "Принято при регистрации",
            yes: 'да',
            no: 'нет'
        },

        avatarUpload: {
            avatarUser: 'Аватар пользователя'
        },
        userInfoCard: {
            edit: "Редактировать"
        },
        contactsCard: {
            contacts: 'Контакты',
            connect: 'подключен',
            disconnect: 'не подключен',
            confirmed: 'подтвержден',
            notConfirmed: 'не подтвержден'
        },
        connectionsCard: {
            title: 'Подключения',
            status: 'Статус',
            connected: 'подключен',
            disconnect: 'не подключен',
            confirm: 'Подтвердить',
            disable: 'Отключить',
            connect: 'Подключить',
        },
        notificationsCard: {
            title: 'Уведомления',
            receiveNews: 'Получать новости сервера',
        },
        languageCard: {
            language: 'Язык',
            currentLanguage: 'Текущий язык'
        }
    },
    notificationsText: {
        title: {
            success: 'Успешно',
            error: 'Ошибка'
        },
        message: {
            tooBigFile: 'Файл слишком большой. Максимальный размер: 5MB',
            networkError: 'Произошла ошибка при загрузке файла',
            isSucessAvatar: 'Аватар успешно загружен',
            telegramConnect:'Telegram подключен',
            telegramDisconnect:'Telegram отключен',
            emailConfirm:"Email подтвержден", 
            subscription:{
                news:'',
                email:'',
                telegram:''
            }
        }
    },
}