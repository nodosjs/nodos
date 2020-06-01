---
to: "./app/controllers/<%= h.inflection.pluralize(name) %>.js"
---
<% actions.split(',').forEach(function(action){ %>
export const <%= action %> = (request, response) => {
};
<% }); %>
