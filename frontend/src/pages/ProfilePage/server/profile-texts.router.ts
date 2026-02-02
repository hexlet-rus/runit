// server/routers/profile-texts.router.ts
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const profileTextsRouter = router({
  getProfileTexts: publicProcedure.query(() => {
    return {
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
          telegramConnect: 'Telegram подключен',
          telegramDisconnect: 'Telegram отключен',
          emailConfirm: "Email подтвержден",
          subscription: {
            news: 'Вы подписались на новости сервиса',
            email: 'Вы подписались на получения новостей по электронной почте',
            telegram: 'Вы подписались на получения новостей по telegram',
          },
          unSubscription: {
            news: 'Подписка на получения новостей сервиса отменена',
            email: 'Подписка на получения новостей сервиса по электронной почте отменена',
            telegram: 'Подписка на получения новостей сервиса по telegram отменена',
          },
          error: {
            networkError: 'Ошибка сети',
            failedPerform: 'Не удалось выполнить действие'
          }
        },
      }
    };
  }),
});