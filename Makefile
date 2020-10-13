setup: bootstrap

bootstrap:
	npx lerna bootstrap --hoist

update-deps:
	ncu -u
	npx lerna exec ncu -- -u

clean:
	npx lerna clean

test:
	DEBUG=nodos:* npx jest

test-application:
	DEBUG=nodos:* cd packages/application-tests && make test

test-example:
	DEBUG=nodos:* cd packages/example && make test

test-ci: test test-application test-example

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npx lerna publish

what-to-do:
	git grep FIXME

docs-build:
	npx documentation build packages/nodos-core -f html -o docs

site-start:
	cd site; npx docusaurus start

site-deploy:
	cd site; GIT_USER=$(U) npm run deploy
