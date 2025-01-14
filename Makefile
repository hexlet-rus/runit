include make-compose.mk

setup: prepare-env install db-migrate build

docker-builds:
	make -C backend docker-builds

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

lint-fix:
	make lint-frontend-fix
	make lint-backend-fix

lint-frontend-fix:
	make -C frontend lint-fix

lint-backend-fix:
	make -C backend lint-fix

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
	make git-update
	make tag TAG=$(shell bin/generate-next-tag)

git-update:
	git switch main
	git pull upstream main --tags --rebase

prepare-env:
	make -C backend prepare-env

build-image:
	docker build . -t runit

run-container:
	docker run --rm runit

compose-ci-build:
	docker build -f Dockerfile.production -t runit .
	docker build -f services/web-nginx/Dockerfile -t runit/services-web .
	docker compose -f docker-compose.yml build
