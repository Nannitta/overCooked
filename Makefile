.PHONY: up
up:
	docker compose up

.PHONY: mysql
mysql:
	docker exec -it 48dc0c71c01d bash

.PHONY: unit
unit:
	docker compose exec app npm run test:unit

.PHONY: e2e
e2e:
	docker compose exec app npm run test:e2e