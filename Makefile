setup: install db-migrate

install:
	yarn install

db-migrate:
	make -C backend db-migrate

db-generate:
	make -C backend db-generate

start:
	yarn run npm-run-all start

start-prod:
	make -C backend start-prod

build:
	yarn run build

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
	npm run start:backend

data-drop:
	make -C backend data-drop

tag:
	git tag $(TAG) && git push upstream $(TAG) --no-verify

release:
	make tag TAG=$(shell bin/generate-next-tag)

compose-setup: compose-build compose-app-setup

compose-build:
	docker-compose build

compose-app-setup:
	docker-compose run backend make setup build
	docker-compose run frontend make install build

compose:
	docker-compose up
