---
title: Routing
slug: /routing
---
This guide covers the user-facing features of Nodos routing.

After reading this guide, you will know:

- [✓] **How to interpret the code in config/routes.yml.**

- [✓] **How to construct your own routes**

## The Purpose of the Nodos Router

Routers are the main hubs of Nodos applications. They match HTTP requests and dispatch them to a controller's action, and define a series of pipeline transformations scoped to a set of routes

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
``` pipeline: browser or pipeline: api``` 
line will get a full treatment in the Pipeline section of this guide. For now, you only need to know that pipelines allow a set of plugs to be applied to different sets of routes.

Inside block, we have our first actual routes
```/users```
