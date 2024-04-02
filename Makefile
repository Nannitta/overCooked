.PHONY: up
up:
	docker compose up

.PHONY: unit
unit:
	docker compose exec app npm run test:unit