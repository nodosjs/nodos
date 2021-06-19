---
title: Routing
slug: /routing
---

This guide covers the user-facing features of Nodos routing.

After reading this guide, you will know:

- [✓] **How to interpret the code in config/routes.yml.**

- [✓] **How to construct your own routes**

## The Purpose of the Nodos Router

The users of your website or web application can visit different URL's like `/`, `/about` or `/user/1`. To make these URLs work, you will have to define them as routes.

Routers are the main hubs of Nodos applications. They match HTTP requests and dispatch them to a controller's action, and define a series of pipeline transformations scoped to a set of routes.

Routes are definedinside the `config/routes.yml`.

```sh
- app/
     config/
       routes.yml
```

## Routes file

The routes for your application or engine live in the file config/routes.rb and typically looks like this:

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

Both the router and controller module names same. 

The `pipeline: browser` line will get a full treatment in the Pipeline section of this guide.

For now, you only need to know that pipelines allow a set of plugs to be applied to different sets of routes.

Inside block, we have our first actual routes `/users`.

When your Nodos application receives an incoming request for: `GET /users/1` it asks the router to match it to a controller action. 

If the first matching route is: `get '/users/:id'` the request is dispatched to the users controller's index action with { id: '1' } in params.

## Resource Routing on the Web: the Nodos Default

Resource routing allows you to quickly declare all of the common routes for a given resourceful controller.

A single call to resources can declare all of the necessary routes for your index, show, new, edit, create, update, and destroy actions.

Browsers request pages from Nodos by making a request for a URL using a specific HTTP method, such as GET, POST, PATCH, PUT and DELETE. 

Each method is a request to perform an operation on the resource. A resource route maps a number of related requests to actions in a single controller.

When your Nodos application receives an incoming request for:

`DELETE /users/1`

it asks the router to map it to a controller action. If the first matching route is:

```sh
    routes:
      - resources: users
```

Nodos would dispatch that request to the destroy action on the users controller with { id: '1' } in params.

## CRUD, Verbs, and Actions

In Nodos, a resourceful route provides a mapping between HTTP verbs and URLs to controller actions.

By convention, each action also maps to a specific CRUD operation in a database.

A single entry in the routing file, such as:

```sh
    routes:
      - resources: users
```

creates eight  different routes in your application, all mapping to the Users controller.

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

## Nested Resources

It is also possible to nest resources in a Nodos router. 

Let's say we also have a posts resource which has a many-to-one relationship with comments. Let's add a new resource.

That is to say, we have many posts, and an individual comment belongs to only one post.

We can represent that by adding a nested route in config/router.yml like this:

```sh
pipelines:
  browser:
    - '@nodosjs/view-extension/fetchFlash'
    - '@nodosjs/view-extension/protectFromForgery'

  api:
    - example/setLocale
    - example/setLocale

scopes:
  - name: api
    pipeline: api
    routes:
      - resources: users
  - name: /
    pipeline: browser
    root: true
    routes:
      - resources: users
      - resources:
          name: posts
          routes:
            - resources: comments
```

When we run `npx nodos routes` now, in addition to the routes we saw for users above, we get the following set of routes:

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
posts            GET    /posts                            browser  posts#index
buildPost        GET    /posts/build                      browser  posts#build
posts            POST   /posts                            browser  posts#create
post             GET    /posts/:id                        browser  posts#show
editPost         GET    /posts/:id/edit                   browser  posts#edit
post             PATCH  /posts/:id                        browser  posts#update
post             PUT    /posts/:id                        browser  posts#update
post             DELETE /posts/:id                        browser  posts#destroy
postComments     GET    /posts/:post_id/comments          browser  posts/comments#index
buildPostComment GET    /posts/:post_id/comments/build    browser  posts/comments#build
postComments     POST   /posts/:post_id/comments          browser  posts/comments#create
postComment      GET    /posts/:post_id/comments/:id      browser  posts/comments#show
editPostComment  GET    /posts/:post_id/comments/:id/edit browser  posts/comments#edit
postComment      PATCH  /posts/:post_id/comments/:id      browser  posts/comments#update
postComment      PUT    /posts/:post_id/comments/:id      browser  posts/comments#update
postComment      DELETE /posts/:post_id/comments/:id      browser  posts/comments#destroy
```

We see that each of these routes scopes the posts to a comments ID.

For the first one, we will invoke the controller index action, but we will pass in a `post_id`.

This implies that we would display all the comments for that individual posts only.

The same scoping applies for all these routes.

## Pipelines

We have come quite a long way in this guide without talking about one of the first lines we saw in the router. It's time to fix that.

```sh
pipelines:
  browser:
    - '@nodosjs/view-extension/fetchFlash'
    - '@nodosjs/view-extension/protectFromForgery'
```

Routes are defined inside scopes and scopes may pipe through multiple pipelines.

Once a route matches, Nodos invokes all plugs defined in all pipelines associated to that route.

For example, accessing `"/"` will pipe through the `:browser` pipeline, consequently invoking all of its plugs.

Nodos defines two pipelines by default, `:browser` and `:api`, which can be used for a number of common tasks.

In turn we can customize them as well as create new pipelines to meet our needs.

## The :browser and :api Pipelines

As their names suggest, the `:browser` pipeline prepares for routes which render requests for a browser.

The :api pipeline prepares for routes which produce data for an api.

The router invokes a pipeline on a route defined within a scope.
