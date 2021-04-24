setup: bootstrap
	cd example && npm i
	npx prisma generate --schema=./packages/nodos-db-prisma-extension/__fixtures__/application/prisma/schema.prisma
	npx prisma migrate dev --schema=./packages/nodos-db-prisma-extension/__fixtures__/application/prisma/schema.prisma
	# cd example && npx nodos db migrate

bootstrap:
	npx lerna bootstrap --hoist

update-deps:
	npx ncu -u
	npx lerna exec ncu -- -u

clean:
	npx lerna clean

test-example:
	cd example && DEBUG=nodos:* npx jest

test-system:
	cd packages/application-tests && DEBUG=nodos:* npx jest

test-packages:
	DEBUG=nodos:* npx jest

test: test-packages test-example test-system

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
	cd site; npm start

site-deploy:
	cd site; GIT_USER=$(U) npm run deploy

docker-build:
	docker build -t nodosjs/nodos .

docker-push:
	docker push nodosjs/nodos
