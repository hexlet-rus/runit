# Runit

[![On Push](https://github.com/hexlet-rus/runit/actions/workflows/push.yml/badge.svg?event=push)](https://github.com/hexlet-rus/runit/actions/workflows/push.yml)

## About

Runit is an environment for writing and executing code that will be actively used on all Hexlet Rus Ltd platforms. The closest counterpart is the repl.it service. The backend is developed in NestJS and TypeScript, the frontend uses React.

Tasks:

* Participation in service development

Features (current and future):

* Edit code online
* Share code via link
* Embed snippets in pages
* Collaborative editing

Tasks can be discussed in [Telegram](https://t.me/hexletcommunity/12).

## System requirements

* node >= 18
* [Yarn 1 (Classic)](https://classic.yarnpkg.com/)
* PostgreSQL for use in production environments or SQLite for use in local development environments

## Installation

```bash
make setup
```

## Running the app

```bash
make start
```

<http://localhost:3000>

## Run tests

### unit tests

```bash
make test
```

### e2e tests

```bash
make test-e2e
```

## API Documentation

Structure of project's APIs is [here](https://runit.hexlet.ru/api).

## Deploy to render.com

To deploy to [render.com](https://dashboard.render.com/) do the following:

1. Create a Postgres database. After preparing it, copy *Internal Database URL*.
2. Create Web Service, select your fork.
3. Name — it is better to use a prefix with your nickname. For example *fey-runit*.
4. Region — any, you can use *Frankfurt (EU Central)*.
5. Branch — from which the application will be deployed. You can use `main` for starters. In the future, use the branch in which you want to demonstrate the changes.
6. Root Directory — leave blank.
7. Runtime — *Node*.
8. Build Command — `make install build`.
9. Start Command — `make db-migrate start-prod`.
10. You can choose any plan, free is enough.
11. Set environment variables. Click on *Advanced* and *Add Environment Variable*.

The following variables will be needed:

* `DATABASE_URL` — this is the URL you copied earlier — *Internal Database URL*
* `NODE_ENV` — `production`
* `SECRET_KEY_JWT` — any string, you can generate a random string or insert `simpleDevKey` for simplicity
* `TRANSPORT_MAILER_URL` — this should be the URL of the connection string of the mail sender. You can use the [Mailtrap](https://mailtrap.io/) service for tests. An example url would be `smtp://login:password@sandbox.smtp.mailtrap.io:2525`.

Click on *Create Web Service* and watch the Deployment and Logs. If there are problems, ask questions [here](https://github.com/hexlet-rus/runit/discussions/categories/q-a). Check first that there is no similar open topic.

## How you can help the project

Look at the list of issues, choose an interesting task, write to the issue to say you would like to work on the task.

---

[![Hexlet Rus Ltd logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor)

This repository is created and maintained by the team and the community of Hexlet Rus Ltd, an educational project. [Read more about Hexlet](https://hexlet.io/?utm_source=github&utm_medium=link&utm_campaign=hexlet-editor).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
