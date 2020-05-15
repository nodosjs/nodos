setup: install bootstrap

install:
	yarn

bootstrap:
	npx lerna bootstrap

test:
	NODOS_ENV=test DEBUG=nodos:* npx jest

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npx lerna publish

# test:
# 	npx lerna run test

lint-ci:
	npx eslint --ignore-pattern app --ignore-pattern example .

what-to-do:
	git grep FIXME

# compose-update:
# 	docker-compose run app yarn update

# compose-setup:
# 	docker-compose run app make setup

# compose-example-setup: compose-setup
# 	docker-compose run app make -C example setup

# compose-example-bash:
# 	docker-compose run -w /code/example app bash

# compose-example:
# 	docker-compose up

# compose-test:
# 	docker-compose run app make test

# compose-server:
# 	docker-compose run app make server

# compose-bash:
# 	docker-compose run app bash
#
docs-start:
	cd docs; npm start

docs-deploy:
	cd docs; GIT_USER=$(U) npm run deploy
