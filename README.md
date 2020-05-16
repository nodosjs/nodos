![Build status](https://github.com/nodosjs/nodos/workflows/push/badge.svg)

# Nodos

Node.js framework for humans

## Requirements

* Nodejs >= 12

## Install

```sh
$ npm i -g @nodosjs/cli
$ nodos new MyBlog
$ cd MyBlog
$ bin/nodos server
# commands: bin/nodos --help
```

## Setup and Run example

```sh
# Setup
$ git clone <this repo>
$ cd nodos
$ make setup
$ cd example
$ make setup
$ bin/nodos test
$ bin/nodos server
```

## Development

We use https://lernajs.io and yarn

```sh
$ git clone <this repo>
$ cd nodos
$ make setup
$ make test

# test single package
$ npx jest packages/nodes-routing
```

How to start (https://github.com/nodosjs/nodos/wiki). Russian version only.
