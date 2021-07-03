---
to: './<%= name %>/config/routes.yml'
---

pipelines:
  browser:
    - '@nodosjs/view-extension/fetchFlash'
    - "<%= name %>/setLocale"
    - "@nodosjs/view-extension/protectFromForgery"

scopes:
  - name: '/'
    pipeline: browser
    routes:
      - root: 'home#index'
