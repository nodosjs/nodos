server:
	bin/nodos server -h 0.0.0.0
test:
	bin/test

compose:
	docker-compose up

compose-test:
	docker-compose run app make test

compose-server:
	docker-compose run app make server

compose-bash:
	docker-compose run app bash
