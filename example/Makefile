setup: link install join

install:
	yarn

link:
	cd ../packages/nodos-application; npm link
	cd ../packages/nodos-jest-environment; npm link
	cd ../packages/nodos-core; npm link
	cd ../packages/nodos-db-extension; npm link
	cd ../packages/nodos-routing; npm link

join:
	npm link @nodosjs/application
	npm link @nodosjs/jest-environment
	npm link @nodosjs/core
	npm link @nodosjs/db-extension
	npm link @nodosjs/routing

start:
	DEBUG=nodos:* npx babel-node node_modules/.bin/nodos server -h 0.0.0.0

routes:
	DEBUG=nodos:* npx babel-node node_modules/.bin/nodos routes

test:
	DEBUG=nodos:* npm test
