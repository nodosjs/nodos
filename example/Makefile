setup: install link

install:
	yarn

link:
	cd ../packages/nodos-application; npm link
	npm link @nodosjs/application
	cd ../packages/nodos-core; npm link
	npm link @nodosjs/core
	cd ../packages/nodos-db; npm link
	npm link @nodosjs/db
	cd ../packages/nodos-routing; npm link
	npm link @nodosjs/routing

start:
	DEBUG=nodos:* npx babel-node node_modules/.bin/nodos server -h 0.0.0.0

routes:
	DEBUG=nodos:* npx babel-node node_modules/.bin/nodos routes

test:
	NODOS_ENV=test DEBUG=nodos bin/nodos test
