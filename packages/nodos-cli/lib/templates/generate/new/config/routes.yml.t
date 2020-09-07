---
to: './<%= name %>/config/routes.yml'
---
pipelines:
  browser:
    - setLocale

scopes:
  - name: '/'
    pipeline: browser
    root: true
    routes:
      - resources: pages
