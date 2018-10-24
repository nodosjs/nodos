[![Build Status](https://travis-ci.com/nodosjs/nodos.svg?branch=master)](https://travis-ci.com/nodosjs/nodos)

# Nodos

Node.js framework for humans

### Install

```sh
$ npm i -g @nodos/cli
$ nodos new MyBlog
$ cd MyBlog
$ npx gulp server
```

### Development

We use https://lernajs.io

```sh
$ git clone # to nodos
$ cd nodos
$ make setup
$ make test
```

How to start (https://github.com/nodosjs/nodos/wiki). Russian version only.

### Tasks

- [x] Рабочий MVP
- [ ] @nodos/routing
    - [ ] root (из рельсового роутинга)
    - [ ] Вложенные ресурсы
    - [ ] npx gulp routes (распечатывает роуты как рельсы)
    - [ ] Pipeline (из феникса)
- [ ] @nodos/cli
    - [ ] Генератор приложения (типа rails new MyBlog)
- [ ] @nodos
    - [ ] Возможность писать тесты
    - [ ] Шаблоны
