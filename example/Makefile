setup: link install join

install:
	yarn

link:
	cd ../packages/nodos-jest-environment; npm link
	cd ../packages/nodos-core; npm link
	cd ../packages/nodos-db-extension; npm link
	cd ../packages/nodos-helpers; npm link
	cd ../packages/nodos-routing; npm link

# unlink:
# 	cd ../packages/nodos-jest-environment; npm unlink
# 	cd ../packages/nodos-core; npm unlink
# 	cd ../packages/nodos-db-extension; npm unlink
# 	cd ../packages/nodos-routing; npm unlink

join:
	npm link @nodosjs/jest-environment
	npm link @nodosjs/core
	npm link @nodosjs/db-extension
	npm link @nodosjs/helpers
	npm link @nodosjs/routing

start:
	DEBUG=nodos:* npm start

routes:
	DEBUG=nodos:* npx nodos routes

test:
	DEBUG=nodos:* npm test
