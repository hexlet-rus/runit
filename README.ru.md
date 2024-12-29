# Runit

[![On Push](https://github.com/hexlet-rus/runit/actions/workflows/push.yml/badge.svg?event=push)](https://github.com/hexlet-rus/runit/actions/workflows/push.yml)

## Описание

Runit — это среда для написания и выполнения кода, которая будет активно использоваться на всех платформах © ООО “Хекслет Рус”. Ближайший аналог — сервис repl.it. Бэкенд разработан на NestJS и TypeScript, фронтенд использует React.

Задачи:

* Участие в развитии проекта

Возможности (текущие и будущие):

* Редактирование кода онлайн
* Шаринг кода по ссылке
* Встраивание сниппетов на страницы
* Совместное редактирование

Задачи можно обсудить в канале [Telegram](https://t.me/hexletcommunity/12).

## Системные требования

* node >= 18
* [Yarn 1 (Classic)](https://classic.yarnpkg.com/)
* PostgreSQL для продакшена, либо SQLite для локальной разработки
* Docker для локальной разработки

## Установка

```bash
make setup
make docker-builds
```

## Запуск приложения

```bash
make start
```

<http://localhost:3000>

## Запуск тестов

### unit тесты

```bash
make test
```

### e2e тесты

```bash
make test-e2e
```

## API документация

Структура API проекта находится [здесь](https://runit.hexlet.ru/api).

## Деплой на render.com

Для деплоя на [render.com](https://dashboard.render.com/) выполните следующие действия:

1. Создайте базу данных Postgres. После её подготовки, скопируйте *Internal Database URL*.
2. Создайте Web Service, выберите ваш форк.
3. Name — лучше использовать префикс с вашим ником. Например *fey-runit*.
4. Region — любой, можно *Frankfurt (EU Central)*.
5. Branch — из неё будет деплоиться приложение. Можно для начала использовать `main`. В дальнейшем используйте ветку, в которой нужно демонстрировать изменения.
6. Root Directory — оставляем пустым.
7. Runtime — *Node*.
8. Build Command — `make install build`.
9. Start Command — `make db-migrate start-prod`.
10. План можно выбрать любой, достаточно бесплатного.
11. Установите переменные окружения. Нажмите на *Advanced* и *Add Environment Variable*.

Потребуются следующие переменные:

* `DATABASE_URL` — этот URL вы скопировали ранее — *Internal Database URL*
* `NODE_ENV` — `production`
* `SECRET_KEY_JWT` — любая строка, можно сгенерировать случайную или вставить `simpleDevKey` для простоты
* `TRANSPORT_MAILER_URL` — здесь должен быть URL строки подключения почтового отправителя. Для тестов можно использовать сервис [Mailtrap](https://mailtrap.io/). Пример урла будет `smtp://login:password@sandbox.smtp.mailtrap.io:2525`

Жмите *Create Web Service* и следите за деплоем и логами. Если будут проблемы, задавайте вопросы [здесь](https://github.com/hexlet-rus/runit/discussions/categories/q-a). Сперва проверьте, что нет похожего открытого топика.

### Использование авторизации через GitHub

Для настройки авторизации через механизм OAuth 2.0 необходимо предварительно [создать и настроить GitHub App](https://docs.github.com/ru/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps).

В настройках в качестве *Authorization callback URL* укажите `{appURL}/api/oauth`, где *{appURL}* – это адрес, по которому будет доступен деплой.

Определите для деплоя следующие переменные окружения:

* `OAUTH_CLIENT_ID` — это *Client ID*, который доступен после создания GitHub App.
* `OAUTH_CLIENT_SECRET` — это *Client secret*, который необходимо сгенерировать в настройках GitHub App.

*Примечание. Для нужд тестирования вместо GitHub App вы можете воспользоваться [OAuth App](https://docs.github.com/ru/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps). GitHub не рекомендует этот тип приложений, но он немного проще в настройке.*

## Как помочь проекту

Посмотрите список issue, выберите интересную задачу, напишите в issue, что хотите работать над этой задачей.

---

[![© ООО «Хекслет Рус» logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor)

Этот репозиторий создается и поддерживается командой и сообществом © ООО «Хекслет Рус», образовательный проект. [Подробнее о © ООО «Хекслет Рус»](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor).

См. самых активных участников на [hexlet-friends](https://friends.hexlet.io/).
