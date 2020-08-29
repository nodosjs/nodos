---
to: './<%= name %>/config/routes.yml'
---
pipelines:
  browser:
    - checkMigrations

scopes:
  - name: '/'
    pipeline: browser
    root: true
    routes:
      - resources: users
