---
id: getting_started
title: Getting Started with Nodos
sidebar_label: Getting Started
---

This guide covers getting up and running with Nodos.

After reading this guide, you will know:
  - How to install Nodos, create a new Nodos application, and connect your application to a database.
  - The general layout of a Nodos application.
  - The basic principles of MVC (Model, View, Controller) and RESTful design.
  - How to quickly generate the starting pieces of a Nodos application.

### 1 Guide Assumptions

This guide is designed for beginners who want to get started with a Nodos application from scratch. It does not assume that you have any prior experience with Nodos.

Nodos is a web application framework running on the JavaScript programming language. If you have no prior experience with JavaScript, you will find a very steep learning curve diving straight into Nodos. There are several curated lists of online resources for learning JavaScript:
  - [Hexlet](https://hexlet.io)
  - [Learn JavaScript with MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)

### 2 What is Nodos

Nodos is a web application development framework written in the JavaScript programming language. It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It allows you to write less code while accomplishing more than many other languages and frameworks.

Nodos is opinionated software. It makes the assumption that there is a "best" way to do things, and it's designed to encourage that way - and in some cases to discourage alternatives. If you learn "The Nodos Way" you'll probably discover a tremendous increase in productivity. If you persist in bringing old habits from other languages to your Nodos development, and trying to use patterns you learned elsewhere, you may have a less happy experience.

The Nodos philosophy includes two major guiding principles:

- Don't Repeat Yourself: DRY is a principle of software development which states that "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." By not writing the same information over and over again, our code is more maintainable, more extensible, and less buggy.
- Convention Over Configuration: Nodos has opinions about the best way to do many things in a web application, and defaults to this set of conventions, rather than require that you specify minutiae through endless configuration files.

### 3 Creating a New Nodos Project

The best way to read this guide is to follow it step by step. All steps are essential to run this example application and no additional code or steps are needed.

By following along with this guide, you'll create a Nodos project called **blog**, a (very) simple weblog. Before you can start building the application, you need to make sure that you have Rails itself installed.

:::note
The examples below use **$** to represent your terminal prompt in a UNIX-like OS, though it may have been customized to appear differently. If you are using Windows, your prompt will look something like **c:\source_code>**
:::

### 3.1 Installing Nodos

Before you install Rails, you should check to make sure that your system has the proper prerequisites installed. These include:
- Node.js >= 12
- SQLite3

#### 3.1.1 Installing Node.js

Open up a command line prompt. On macOS open Terminal.app, on Windows choose "Run" from your Start menu and type 'cmd.exe'. Any commands prefaced with a dollar sign **$** should be run in the command line. Verify that you have a current version of Node installed:
```
$ node -v
v14.8.0
```
Nodos requires Node.js version 12 or later. If the version number returned is less than that number, you'll need to install a fresh copy of Node.js.
:::note
For more installation methods for most Operating Systems take a look at [Node.js](https://nodejs.org/en/).
:::

#### 3.1.2 Installing SQLite3

You will also need an installation of the SQLite3 database. Many popular UNIX-like OSes ship with an acceptable version of SQLite3. Others can find installation instructions at the [SQLite3 website](https://www.sqlite.org/index.html). Verify that it is correctly installed and in your PATH:
```
$ sqlite3 --version
```
The program should report its version.

#### 3.1.3 Installing Nodos

To install Nodos, use the **npm install -g** command provided by NPM:
```
$ npm install -g @nodosjs/cli
```
To verify that you have everything installed correctly, you should be able to run the following:
```
nodos --version
```
If it says something like "Nodos 1.0.0", you are ready to continue.

### 3.2 Create the Blog Application

Nodos comes with a number of scripts called generators that are designed to make your development life easier by creating everything that's necessary to start working on a particular task. One of these is the new application generator, which will provide you with the foundation of a fresh Nodos application so that you don't have to write it yourself.

To use this generator, open a terminal, navigate to a directory where you have rights to create files, and type:
```
$ nodos new blog
```
This will create a Nodos application called Blog in a **blog** directory and install the npm dependencies that are already mentioned in **package.json** using **npm install**.

After you create the blog application, switch to its folder:
```
$ cd blog
```
The **blog** directory has a number of auto-generated files and folders that make up the structure of a Nodos application. Most of the work in this tutorial will happen in the app folder, but here's a basic rundown on the function of each of the files and folders that Nodos created by default

| File/Folder   |   Purpose     |
| ------------- | :-----------: |
| app/ | Contains the controllers, entities, views, and assets for your application. You'll focus on this folder for the remainder of this guide. |
| config/ | Configure your application's routes, database, and more. This is covered in more detail in Configuring Nodos Applications.  |
| db/ | Contains your current database schema, as well as the database migrations. |
| package.json, package-lock.json | These files allow you to specify what npm dependencies are needed for your Nodos application. These files are used by the npm. For more information about npm, see the [npm website](https://www.npmjs.com).|
| babel.config.js | To support older node versions and newest syntax. For more information about babel, see the [balel](https://babeljs.io) |
| public/ |   The only folder seen by the world as-is. Contains static files and compiled assets.     |
| tests/ | Unit tests, fixtures, and other test apparatus. These are covered in Testing Nodos Applications. |
| .gitignore | This file tells git which files (or patterns) it should ignore. See [GitHub - Ignoring files](https://docs.github.com/en/free-pro-team@latest/github/using-git/ignoring-files) for more info about ignoring files. |
| .eslintrc.yml |  |
| .eslintignore |  |


### 4 Hello, Nodos!

To begin with, let's get some text up on screen quickly. To do this, you need to get your Nodos application server running.

#### 4.1 Starting up the Web Server











### Feedback

You're encouraged to help improve the quality of this guide.

Please contribute if you see any typos or factual errors. To get started, you can read our documentation contributions section.

You may also find incomplete content or stuff that is not up to date. Please do add any missing documentation for master. Make sure to check Edge Guides first to verify if the issues are already fixed or not on the master branch. Check the Nodos Guides Guidelines for style and conventions.

If for whatever reason you spot something to fix but cannot patch it yourself, please open an issue.
