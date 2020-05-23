setup: install

install:
	npm install

start:
	DEBUG=nodos:* npm start

nodos:
	DEBUG=nodos:* npx nodos

nodos-routes:
	DEBUG=nodos:* npx nodos routes

nodos-console:
	DEBUG=nodos:* npx nodos console

test:
	DEBUG=nodos:* npm test

link:
	cd ../nodos-jest-environment; npm link
	cd ../nodos-cli; npm link
	cd ../nodos-core; npm link
	cd ../nodos-db-extension; npm link
	cd ../nodos-helpers; npm link
	cd ../nodos-routing; npm link

join:
	npm link @nodosjs/jest-environment
	npm link @nodosjs/cli
	npm link @nodosjs/core
	npm link @nodosjs/db-extension
	npm link @nodosjs/helpers
	npm link @nodosjs/routing
