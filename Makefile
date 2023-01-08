setup: install db-migrate

install:
	npm install

db-migrate:
	npm run typeorm -- migration:run -d src/data-source.ts

db-generate:
	npm run typeorm -- migration:generate src/migrations/migrations -d src/data-source.ts

start:
	npm run start:dev

front-dev:
	npm run serve

build:
	npm run build

lint:
	npm run lint

lint-frontend:
	npx eslint --ext .jsx,.js app/

test:
	npm test

test-e2e:
	npm run test:e2e

heroku-deploy:
	git push heroku

heroku-logs:
	heroku logs

start-frontend:
	npx webpack --watch --progress

data-drop:
	npm run typeorm -- migration:revert -d src/data-source.ts
