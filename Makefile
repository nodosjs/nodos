test:
	DEBUG=nodos:* npx jest

setup:
	npx lerna bootstrap

build:
	npm run-script build

lint:
	npx eslint .

lint-ci:
	npx eslint --ignore-pattern app --ignore-pattern example .
