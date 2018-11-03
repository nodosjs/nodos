server:
	bin/nodos server -h 0.0.0.0

test:
	bin/test

compose-update:
	docker-compose run app npm update

compose-setup:
	docker-compose run app npm install

compose:
	docker-compose up

compose-test:
	docker-compose run app make test

compose-server:
	docker-compose run app make server

compose-bash:
	docker-compose run app bash
