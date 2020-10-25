setup: bootstrap
	cd application-tests && npm install
	cd example && npm install
	cd packages/example && npx nodos migrate

bootstrap:
	npx lerna bootstrap --hoist

update-deps:
	npx ncu -u
	cd application-tests && npx ncu -u
	cd example && npx ncu -u
	npx lerna exec ncu -- -u

clean:
	npx lerna clean

test:
	DEBUG=nodos:* npx jest

test-application:
	DEBUG=nodos:* cd application-tests && make test

test-example:
	DEBUG=nodos:* cd example && make test

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
