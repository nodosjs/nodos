setup: bootstrap

bootstrap:
	npx lerna bootstrap --hoist

# install:
# 	npm install

update-deps:
	npx lerna exec ncu -- -u

clean:
	npx lerna clean

test:
	DEBUG=nodos:* npx jest

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

link:
	npx lerna publish

publish:
	npx lerna publish

what-to-do:
	git grep FIXME

docs-start:
	cd docs; npm start

docs-deploy:
	cd docs; GIT_USER=$(U) npm run deploy
