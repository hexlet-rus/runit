compose:
	docker compose up -d

compose-production:
	docker compose --file docker-compose.yml run production

compose-build:
	docker compose build

compose-logs:
	docker compose logs -f

compose-down:
	docker compose down --remove-orphans || true

compose-clear:
	docker compose down -v --remove-orphans || true

compose-stop:
	docker compose stop || true

compose-restart:
	docker compose restart

compose-setup: compose-down compose-build

compose-ci-build:
	# docker build -f Dockerfile.production -t runit .
	docker compose -f docker-compose.yml build

compose-ci: compose-ci-build
	docker compose --file docker-compose.yml up --abort-on-container-exit

production-compose-build:
	docker compose -f docker-compose.production.yml -p runit-production build

production-compose-migrate:
	docker compose -f docker-compose.production.yml -p runit-production run app make db-migrate

production-compose:
	docker compose -f docker-compose.production.yml -p runit-production up --abort-on-container-exit

production-compose-app-bash:
	docker compose -f docker-compose.production.yml -p runit-production exec app bash
