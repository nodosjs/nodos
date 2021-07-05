---
to: './<%= name %>/package.json'
---

{
  "name": "<%= name %>",
  "scripts": {
    "test": "jest",
    "start": "nodos server",
    "build": "webpack -p"
  },
  "jest": {
    "testEnvironment": "@nodosjs/jest-environment",
    "testPathIgnorePatterns": [
      "/config/",
      "/node_modules/"
    ]
  },
  "dependencies": {
    "@babel/core": "^7.14.5",
    "@babel/node": "^7.14.5",
    "@babel/preset-env": "^7.14.5",
    "@nodosjs/cli": "^<%= version %>",
    "@nodosjs/core": "^<%= version %>",
    "@nodosjs/db-prisma-extension": "^<%= version %>",
    "@nodosjs/view-extension": "^<%= version %>",
<% if (!without.includes('webpack')) { -%>
    "@nodosjs/webpack-extension": "^<%= version %>",
<% } -%>
    "pg": "^8.5.3"
  },
  "devDependencies": {
    "@nodosjs/jest-environment": "^<%= version %>",
    "babel-jest": "^27.0.6",
    "eslint": "^7.28.0",
    "eslint-plugin-babel": "^5.3.1",
    "eslint-plugin-jest": "^24.3.6",
    "jest": "^27.0.6",
    "jest-cli": "^27.0.6"
  }
}
