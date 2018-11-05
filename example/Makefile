setup: install links

install:
	yarn

links:
	yarn --cwd ../packages/nodos-core link
	yarn --cwd ../packages/nodos-db link
	yarn --cwd ../packages/nodos-routing link
	yarn link @nodosjs/core
	yarn link @nodosjs/db
	yarn link @nodosjs/routing

server:
	bin/nodos server -h 0.0.0.0

test:
	bin/nodos test
