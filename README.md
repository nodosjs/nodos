[![Build Status](https://travis-ci.com/nodosjs/nodos.svg?branch=master)](https://travis-ci.com/nodosjs/nodos)

# Nodos

Node.js framework for humans

### Requirements

* Nodejs >= 10
* Docker (for developing nodos)

### Install

```sh
$ npm i -g @nodosjs/cli
$ nodos new MyBlog
$ cd MyBlog
$ bin/nodos server
# commands: bin/nodos --help
```

### Example

```sh
# Setup
$ git clone <this repo>
$ cd nodos
$ make compose-setup-example

# Run server
$ make compose-example # then open localhost:3000

# Run tests
$ make compose-example-bash
$ bin/nodos tests
$ bin/nodos server
```

### Development

We use https://lernajs.io and yarn

```sh
$ git clone # to nodos
$ make compose-setup
$ make compose-bash
$ make test
```

How to start (https://github.com/nodosjs/nodos/wiki). Russian version only.
