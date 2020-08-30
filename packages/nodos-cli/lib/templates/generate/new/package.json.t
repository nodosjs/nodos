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
    "@nodosjs/core": "^<%= version %>"
  },
  "devDependencies": {
    "mini-css-extract-plugin": "^0.11.0",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-merge": "^5.1.3"
  }
}
