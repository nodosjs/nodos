---
to: "./app/templates/<%= h.inflection.pluralize(name) %>/index.pug"
---

extends /layouts/application.pug

block content
  .mb-3
    a.btn.btn-primary(href=route('buildUser')) New user

  if users.length > 0
    table.table
      tr
        td id
        td Email
        td First Name
      each user in users
        tr
          td= user.id
          td= user.email
          td= user.firstName
