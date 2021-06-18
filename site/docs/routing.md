---
title: Routing
slug: /routing
---

This guide covers the user-facing features of Nodos routing.

After reading this guide, you will know:

-   [✓] **How to interpret the code in config/routes.yml.**

-   [✓] **How to construct your own routes**

## The Purpose of the Nodos Router

The users of your website or web application can visit different URL's like `/`, `/about` or `/user/1`. To make these URLs work, you will have to define them as routes.

Routers are the main hubs of Nodos applications. They match HTTP requests and dispatch them to a controller's action, and define a series of pipeline transformations scoped to a set of routes.

Routes are definedinside the `config/routes.yml`.

## Routes file

The router file that Nodos generates, config/routes.yml, will look something like this one:

```sh
pipelines:
  browser:
    - '@nodosjs/view-extension/fetchFlash'
    - '@nodosjs/view-extension/protectFromForgery'

scopes:
  - name: /
    pipeline: browser
    root: true
    routes:
      - resources: users
```

Both the router and controller module names same. The
` pipeline: browser`
line will get a full treatment in the Pipeline section of this guide. For now, you only need to know that pipelines allow a set of plugs to be applied to different sets of routes.

Inside block, we have our first actual routes and `/users` and when your Nodos application receives an incoming request for:

`GET /users/1`

it asks the router to match it to a controller action. If the first matching route is:

`get '/users/:id'`

the request is dispatched to the users controller's index action with { id: '1' } in params.

## Resource Routing on the Web: the Nodos Default

Resource routing allows you to quickly declare all of the common routes for a given resourceful controller. A single call to resources can declare all of the necessary routes for your index, show, new, edit, create, update, and destroy actions.

Browsers request pages from Nodos by making a request for a URL using a specific HTTP method, such as GET, POST, PATCH, PUT and DELETE. Each method is a request to perform an operation on the resource. A resource route maps a number of related requests to actions in a single controller.

When your Nodos application receives an incoming request for:

`DELETE /users/1`

it asks the router to map it to a controller action. If the first matching route is:

```sh
    routes:
      - resources: users
```

Nodos would dispatch that request to the destroy action on the users controller with { id: '1' } in params.

## CRUD, Verbs, and Actions

In Nodos, a resourceful route provides a mapping between HTTP verbs and URLs to controller actions. By convention, each action also maps to a specific CRUD operation in a database. A single entry in the routing file, such as:

```sh
    routes:
      - resources: users
```

creates seven different routes in your application, all mapping to the Users controller.

Running `npx nodos routes` now shows that we have all the routes.

```sh
Name             Verb   URI Pattern                       Pipeline Controller#Action
users            GET    /users                            browser  users#index
buildUser        GET    /users/build                      browser  users#build
users            POST   /users                            browser  users#create
user             GET    /users/:id                        browser  users#show
editUser         GET    /users/:id/edit                   browser  users#edit
user             PATCH  /users/:id                        browser  users#update
user             PUT    /users/:id                        browser  users#update
user             DELETE /users/:id                        browser  users#destroy
```

Because the router uses the HTTP verb and URL to match inbound requests, four URLs map to eight different actions.
