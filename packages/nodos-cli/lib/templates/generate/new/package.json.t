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
    "@babel/core": "^7.11.5",
    "@babel/node": "^7.10.5",
    "@babel/preset-env": "^7.11.5",
    "@nodosjs/core": "^<%= version %>",
    "@nodosjs/db-extension": "<%= version %>",
    "@nodosjs/view-extension": "<%= version %>",
    "@nodosjs/jest-environment": "^<%= version %>",
    "@nodosjs/webpack-extension": "^<%= version %>",
    "babel-jest": "^26.3.0",
    "jest": "^26.4.2",
    "jest-cli": "^26.4.2",
    "sql.js": "^1.3.0"
  },
  "devDependencies": {
    "eslint": "^7.7.0",
    "eslint-plugin-babel": "^5.3.1",
    "eslint-plugin-jest": "^23.20.0"
  }
}
