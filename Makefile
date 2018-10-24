test:
	NODOS_ENV=test DEBUG=nodos:* npx jest

setup: install bootstrap build

install:
	npm i

bootstrap:
	npx lerna bootstrap

build:
	npm run-script build

lint:
	npx eslint .

lint-ci:
	npx eslint --ignore-pattern app --ignore-pattern example .

what-to-do:
	git grep FIXME
