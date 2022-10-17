setup: install db-migrate

install:
	npm install

db-migrate:
	npm run typeorm -- migration:run -d src/data-source.ts

db-generate:
	npm run typeorm -- migration:generate src/migrations/migrations -d src/data-source.ts

start:
	npm run start:dev

start-dev:
	NODE_ENV=development npm run start:dev

front-dev:
	npm run serve

build:
	npm run build

lint:
	npm run lint

test:
	npm test

heroku-deploy:
	git push heroku

heroku-logs:
	heroku logs

start-frontend:
	npx webpack --watch --progress

data-drop:
	npm run typeorm -- migration:revert -d src/data-source.ts
