setup: bootstrap
	cd packages/example && npx nodos db migrate

bootstrap:
	npx lerna bootstrap --hoist

update-deps:
	npx ncu -u
	npx lerna exec ncu -- -u

clean:
	npx lerna clean

test-example:
	DEBUG=nodos:* cd example && npx jest

test-application-tests:
	DEBUG=nodos:* cd example && npx jest

test:
	DEBUG=nodos:* npx jest

test-ci: test test-example test-application-tests

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
