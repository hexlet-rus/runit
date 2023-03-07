# Runit

[![On Push](https://github.com/hexlet-rus/runit/actions/workflows/push.yml/badge.svg?event=push)](https://github.com/hexlet-rus/runit/actions/workflows/push.yml)

## Описание

Runit — это среда для написания и выполнения кода, которая будет активно использоваться на всех платформах © ООО “Хекслет Рус”. Ближайший аналог — сервис repl.it. Бэкенд разработан на NestJS и TypeScript, фронтенд использует React.

Задачи:

* Участие в развитии проекта

Возможности (текущие и будущие):

* редактирование кода онлайн
* Шаринг кода по ссылке
* Всраивание сниппетов на страницы
* Совместное редактирование

Задачи можно обсудить в канале [Telegram community](https://t.me/hexletcommunity/12).

## Системные требования

* node >= 18
* Yarn
* Heroku CLI (только для деплоя)
* PostgreSQL для продакшена, либо sqlite для локальной разработки.

## Установка

```bash
make setup
```

## Запуск приложения

```bash
make start
```
http://localhost:3000

## Деплой на Render.com

Для деплоя на [Render.com](https://dashboard.render.com/) выполните следующие действия

1. создайте базу данных Postgres. После её подготовки, скопируйте Internal Database URL
2. Создайте Web Service, выберите ваш форк.
3. Название - лучше использовать префикс с вашим ником. Например *fey-runit*
4. Регион - любой, можно *Frankfurt (EU Central)
5. Ветка - из неё будет деплоиться приложение. Можно для начала использовать `main`. В дальнейшем используйте ветку, в которой нужно демонстрировать изменения
6. Root Directory - оставляем пустым
7. Runtime - *Node*
8. Build Command - `make install build`.
9. Start Command - `make db-migrate start-prod`
10. План можно выбрать любой, достаточно бесплатного.
11. Установите переменные окружения. Нажмите на *Advanced* и *Add Environment Variable*

Потребуются следующие переменные

* `DATABASE_URL`- этот URL вы скопировали ранее - Internal Database URL
* `NODE_ENV` - `production`
* `SECRET_KEY_JWT` любая строка, можно сгенерировать случайную или вставить `simpleDevKey` для простоты
* `TRANSPORT_MAILER_URL` Здесь должен быть URL строки подключения почтового отправителя. Для тестов можно использовать сервис [Mailtrap](https://mailtrap.io/). Пример урла будет такой `smtp://login:password@sandbox.smtp.mailtrap.io:2525`

Жмите *Create Web Service* и следите за деплоем и логами. Если будут проблемы, задавайте вопросы [здесь](https://github.com/hexlet-rus/runit/discussions/categories/q-a). Сперва проверьте, что нет похожего открытого топика.

## Как помочь проекту

Посмотрите список issue, выберите интересную задачу, напишите в issue, что хотите работать над этой задачей.

---

[![© ООО “Хекслет Рус” logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor)

Этот репозиторий создается и поддерживается командой и сообществом © ООО “Хекслет Рус”, образовательный проект. [Подробнее о © ООО “Хекслет Рус”](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor).

См. самых активных участников на [hexlet-friends](https://friends.hexlet.io/).
