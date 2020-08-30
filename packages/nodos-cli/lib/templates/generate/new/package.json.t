---
to: './<%= name %>/package.json'
---
{
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
    "@babel/core": "^7.11.4",
    "@babel/node": "^7.10.5",
    "@babel/preset-env": "^7.11.0",
    "@nodosjs/core": "^<%= version %>",
    "@nodosjs/jest-environment": "^<%= version %>",
    "@nodosjs/webpacker": "^<%= version %>"
  }
}
