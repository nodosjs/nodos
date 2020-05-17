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

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npx lerna publish

what-to-do:
	git grep FIXME

docs-start:
	cd docs; npm start

docs-deploy:
	cd docs; GIT_USER=$(U) npm run deploy
