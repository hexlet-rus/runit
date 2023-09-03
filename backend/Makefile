setup: prepare-env install db-migrate

install:
	npm install

db-migrate:
	npm run typeorm -- migration:run -d src/data-source

db-generate:
	npm run typeorm -- migration:generate src/migrations/migrations -d src/data-source

start:
	npm run start

start-prod:
	npm run start:prod

build:
	npm run build

lint:
	npm run lint

lint-fix:
	npm run lint-fix

test:
	npm test

test-e2e:
	npm run test:e2e

data-drop:
	npm run typeorm -- migration:revert -d src/data-source.ts

prepare-env:
	cp -n .env.example .env
