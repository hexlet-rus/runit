setup: install db-migrate

install:
	make -C backend install
	make -C frontend install

db-migrate:
	make -C backend db-migrate

db-generate:
	make -C backend db-generate

start:
	make start-backend &
	make start-frontend

start-prod:
	make -C backend start-prod

build:
	DISABLE_ESLINT_PLUGIN=true make -C frontend build
	make -C backend build

lint:
	make lint-frontend
	make lint-backend

lint-frontend:
	make -C frontend lint

lint-backend:
	make -C backend lint

test:
	make -C backend test

test-e2e:
	npm test

heroku-deploy:
	git push heroku

heroku-logs:
	heroku logs

start-frontend:
	make -C frontend start

start-backend:
	npm run start-backend-development

data-drop:
	make -C backend data-drop
