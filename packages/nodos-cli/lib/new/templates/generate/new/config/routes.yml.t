---
to: './<%= name %>/config/routes.yml'
---

pipelines:
  browser:
    - "<%= name %>/setLocale"
    - "@nodosjs/view-extension/protectFromForgery"

scopes:
  - name: '/'
    pipeline: browser
    root: true
