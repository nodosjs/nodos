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
    "@babel/core": "^7.13.10",
    "@babel/node": "^7.13.10",
    "@babel/preset-env": "^7.13.10",
    "@nodosjs/cli": "^<%= version %>",
    "@nodosjs/core": "^<%= version %>",
    "@nodosjs/db-typeorm-extension": "^<%= version %>",
    "@nodosjs/view-extension": "^<%= version %>",
    "@nodosjs/webpack-extension": "^<%= version %>",
    "sql.js": "^1.5.0",
    "pg": "^8.5.1"
  },
  "devDependencies": {
    "@nodosjs/jest-environment": "^<%= version %>",
    "babel-jest": "^26.3.0",
    "eslint": "^7.22.0",
    "eslint-plugin-babel": "^5.3.1",
    "eslint-plugin-jest": "^24.3.1",
    "jest": "^26.6.3",
    "jest-cli": "^26.6.3"
  }
}
