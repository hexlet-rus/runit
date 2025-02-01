setup: prepare-env install db-migrate

install:
	npm install

docker-builds:
	docker build -t runit-local-runner-python ./src/runner/dockers/python
	docker build -t runit-local-runner-php ./src/runner/dockers/php
	docker build -t runit-local-runner-java ./src/runner/dockers/java
	docker build -t runit-local-runner-ruby ./src/runner/dockers/ruby

db-migrate:
	npm run typeorm -- migration:run -d src/data-source.ts

db-generate:
	npm run typeorm -- migration:generate src/migrations -d src/data-source

db-revert:
	npm run typeorm -- migration:revert -d src/data-source.ts

db-refresh: db-revert db-migrate

db-create-migration:
	npm run typeorm migration:create src/migrations/$(NAME)

db-drop:
	npm run typeorm -- schema:drop -d src/data-source.ts

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

# Set admin by email. Usage: make set-admin email=test@test.ru
set-admin:
	npm run set-admin -- $(email)
