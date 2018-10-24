test:
	NODOS_ENV=test DEBUG=nodos:* npx jest

setup:
	npm i
	npx lerna bootstrap
	npm run-script build

build:
	npm run-script build

lint:
	npx eslint .

lint-ci:
	npx eslint --ignore-pattern app --ignore-pattern example .

what-to-do:
	git grep FIXME
