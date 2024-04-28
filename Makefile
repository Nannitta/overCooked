.PHONY: up
up:
	docker compose up

.PHONY: down
down:
	docker compose down

.PHONY: mysql
mysql:
	docker exec -it overcooked-mysqlhost-1 bash

.PHONY: updateDB
updateDB:
	docker compose exec app npm run updateDB

.PHONY: unit
unit:
	docker compose exec app npm run test:unit

.PHONY: e2e
e2e:
	docker compose exec -e START_SERVER=false app npm run test:e2e