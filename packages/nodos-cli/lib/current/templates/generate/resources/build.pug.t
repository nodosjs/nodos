---
to: "./app/templates/<%= h.inflection.pluralize(name) %>/build.pug"
---

extends /layouts/application.pug

block content
  form(action=route('users') method="post")
    input(type="hidden" name="_csrf" value=csrfToken)
    .form-group
      label Email
      input.form-control(type="text" name="user[email]" value=user.email)
    .form-group
      label First Name
      input.form-control(type="text" name="user[firstName]" value=user.firstName)
    div
      input.btn.btn-primary(type="submit")

