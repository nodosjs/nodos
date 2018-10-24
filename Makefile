test:
	npx jest

setup:
	npx lerna bootstrap

build:
	npm run-script build

lint:
	npx eslint .
