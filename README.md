![Build status](https://github.com/nodosjs/nodos/workflows/On%20Push/badge.svg)

# Nodos

Node.js framework for humans

## Requirements

* Nodejs >= 12

## Install

```sh
$ npm i -g @nodosjs/cli
$ nodos new MyBlog
$ cd MyBlog
$ nodos server
# commands: nodos --help
```

## Development

We use https://lernajs.io

```sh
# Setup
$ git clone <this repo>
$ cd nodos
$ make setup
$ make test

# test single package
$ npx jest packages/nodes-routing
```

### Example project


```sh
$ cd nodos/packages/example
$ make test
$ make start
```
