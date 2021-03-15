---
to: './<%= name %>/config/routes.yml'
---
pipelines:
  browser:
    - setLocale
    - protectFromForgery

scopes:
  - name: '/'
    pipeline: browser
    root: true
    routes:
      - resources: users
