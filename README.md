![Build status](https://github.com/nodosjs/nodos/workflows/On%20Push/badge.svg)

# Nodos

Node.js framework for humans

* [site (under development)](https://nodosjs.github.io)
* [api documentation](https://nodosjs.github.io/nodos/)

## Requirements

* Nodejs >= 14

## Install

```sh
npm i -g @nodosjs/cli
nodos new MyBlog
cd MyBlog
npm install
nodos server # see http://localhost:3000/
# commands: nodos --help
```

## Development

We use https://lerna.js.org

```sh
# Setup
git clone <this repo>
cd nodos
make setup
make test

# test single package
npx jest packages/nodes-routing
```

### Example project


```sh
cd example
make test
make start
```

## TODO

### Сайты

1. Зафигачить сайт чтобы было красиво https://github.com/nodosjs/nodosjs.github.io. Подсматриваем тут https://adonisjs.com/.
1. Написать основные гайды в стиле rails guides
1. Сделать хороший getting started

### Документация в коде

Тут еще надо разобраться как сделать. Общая идея состоит в том чтобы подрубить ts-check, описания типов (на typescript) и получить сразу две вещи. Типизацию внутри проекта и доку. Сама дока будет генерироваться documentation.js

### Ядро

* По коду разбросано много FIXME и TODO которые надо фиксить
* Сделать полный вывод команд db в терминале `npx nodos`
* Реализовать поддержку вебсокетов
* Реализовать нормальную обработку валидации
* Кастомная обработка ошибок http (404, 500, ...)
* Подключить dotenv (12 factors)

#### Вью

* Реализовать автоматические формы с переводами и генерацией нужной верстки из коробки

### example

1. Привести в порядок layout, вывести все ссылки
