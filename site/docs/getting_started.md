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

By following along with this guide, you'll create a Nodos project called **blog**, a (very) simple weblog. Before you can start building the application, you need to make sure that you have Nodos itself installed.

:::note
The examples below use **$** to represent your terminal prompt in a UNIX-like OS, though it may have been customized to appear differently. If you are using Windows, your prompt will look something like **c:\source_code>**
:::

### 3.1 Installing Nodos

Before you install Nodos, you should check to make sure that your system has the proper prerequisites installed. These include:
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
| babel.config.js | To support older node versions and newest syntax. For more information about babel, see the [balel](https://babeljs.io). |
| public/ |   The only folder seen by the world as-is. Contains static files and compiled assets.     |
| tests/ | Unit tests, fixtures, and other test apparatus. These are covered in Testing Nodos Applications. |
| .gitignore | This file tells git which files (or patterns) it should ignore. See [GitHub - Ignoring files](https://docs.github.com/en/free-pro-team@latest/github/using-git/ignoring-files) for more info about ignoring files. |
| .eslintrc.yml | Config for [ESLint](https://eslint.org/) - static code analyzer. |
| .eslintignore | Specify for ESLing what files will be ignored. |


### 4 Hello, Nodos!

To begin with, let's get some text up on screen quickly. To do this, you need to get your Nodos application server running.

### 4.1 Starting up the Web Server

You actually have a functional Nodos application already. To see it, you need to start a web server on your development machine. You can do this by running the following in the **blog** directory:

```
$ nodos server
```

This will fire up [Fastify](https://github.com/fastify/fastify), a web server. To see your application in action, open a browser window and navigate to [http://localhost:3000](http://localhost:3000). You should see the Nodos default information page.


:::note
To stop the web server, hit Ctrl+C in the terminal window where it's running. To verify the server has stopped you should see your command prompt cursor again. For most UNIX-like systems including macOS this will be a dollar sign **$**. In development mode, Nodos does not generally require you to restart the server; changes you make in files will be automatically picked up by the server.
:::

### 4.2 Say "Hello", Nodos

To get Nodos saying "Hello", you need to open the **app/templates/root/default.pug** file in your text editor. Delete all of the existing code in the file, and replace it with the following single line of code:
```
h1 Hello, Nodos!
```

### 5 Getting Up and Running

Let's create something with a bit more substance. For substance we need at minimum a _controller_ and a _view_.

A controller's purpose is to receive specific requests for the application. _Routing_ decides which controller receives which requests. Often, there is more than one route to each controller, and different routes can be served by different _actions_. Each action's purpose is to collect information to provide it to a view.

A view's purpose is to display this information in a human readable format. An important distinction to make is that it is the _controller_, not the view, where information is collected. The view should just display that information. By default, view templates are written in a language called pug which is processed by the request cycle in Nodos before being sent to the user.

In the Blog application, you will now create a new resource. A resource is the term used for a collection of similar objects, such as articles, people, or animals. You can create, read, update, and destroy items for a resource and these operations are referred to as CRUD operations.

To create a new controller, you will need to run the "controller" generator and tell it you want a controller called "articles", just like this:
```
$ nodos generate controller articles
```
Nodos will create several files and a route for you.
```
added: ./app/templates/articles/build.pug
added: ./app/controllers/articles.js
added: ./app/templates/articles/edit.pug
added: ./app/templates/articles/index.pug
added: ./app/templates/articles/show.pug
```
Now that we have made the controllers and views, we need to tell Nodos where we want use it.

Open the file config/routes.yml in your editor.
```
pipelines:
  browser:
    - setLocale

scopes:
  - name: '/'
    pipeline: browser
    root: true
```
This is your application's _routing_ _file_ which holds entries in a special [DSL (domain-specific language)](https://en.wikipedia.org/wiki/Domain-specific_language) that tells Nodos how to connect incoming requests to controllers and actions. Nodos provides a **resources** key which can be used to declare a standard REST resource. You need to add the article resource to the **config/routes.yml** so the file will look as follows:
```
pipelines:
  browser:
    - setLocale

scopes:
  - name: '/'
    pipeline: browser
    root: true
    routes:
      - resources: articles
```
If you run **nodos routes**, you'll see that it has defined routes for all the standard RESTful actions. The meaning of the prefix column (and other columns) will be seen later, but for now notice that Nodos has inferred the singular form **article** and makes meaningful use of the distinction.
```
Name                Verb   URI Pattern                             Pipeline
articles            GET    /articles                               browser
buildArticle        GET    /articles/build                         browser
articles            POST   /articles                               browser
article             GET    /articles/:id                           browser
editArticle         GET    /articles/:id/edit                      browser
article             PATCH  /articles/:id                           browser
article             PUT    /articles/:id                           browser
article             DELETE /articles/:id                           browser
```

In the next section, you will add the ability to create new articles in your application and be able to view them. This is the "C" and the "R" from CRUD: create and read.

### 5.1 First Form

# TODO NO FORM BUILDER NOW

To create a form within this template, you will use a _form builder_. The primary form builder for Nodos is provided by a helper method called **form**. To use this method, add this code into app/templates/articles/build.pug:
```
form(action=route('articles') method="post")
  input(type="hidden" name="_csrf" value=csrfToken)
  div
    label title
    input(type="input" name="article[title]")
  div
    label text
    input(type="text" name="article[text]")
  div
    input(type="submit")
```

### 5.2 Creating article

If you submit the form now, you should see **ENOENT: no such file or directory, open 'app/templates/articles/create.pug'**. This is because Nodos by default render appropriate template and returns 204 No Content response for an action if we don't specify what the response should be. We just added the create action but didn't specify anything about how the response should be. In this case, the create action should save our new article to the database.

When a form is submitted, the fields of the form are sent to Nodos as parameters. These parameters can then be referenced inside the controller actions, typically to perform a particular task. To see what these parameters look like, change the create action to this:
```
export const create = (request, response, p) => {
  const { body } = request;
  response.send(body.article);
};
```
The **send** method here is taking body, it is our params. The **body** method is the object which represents the parameters (or fields) coming in from the form. In this situation, the only parameters that matter are the ones from the form.

If you re-submit the form one more time, you'll see something that looks like the following:
```
{"title":"First Article!","text":"This is my first article."}
```
This action is now displaying the parameters for the article that are coming in from the form. However, this isn't really all that helpful. Yes, you can see the parameters but nothing in particular is being done with them.

### 5.3 Creating the Article model

Models in Nodos use a singular name, and their corresponding database tables use a plural name. Nodos provides a generator for creating models, which most Nodos developers tend to use when creating new models. To create the new model, run this command in your terminal:
```
$ nodos generate model article
```
With that command we told Nodos that we want an **Article** model.

After we need generate a migration, that create a article model in database.
```
$ nodos generate migration create_articles_table
```
It will generate a **db/migrations/20201012203145_create_articles_table.js** (your name could be a bit different).

### 5.4 Running a Migration

Migrations are JavaScript code that are designed to make it simple to create and modify database tables. Migration filenames include a timestamp to ensure that they're processed in the order that they were created.

If you look in the db/migrate/YYYYMMDDHHMMSS_create_articles_table.js file (remember, yours will have a slightly different name). We need to create fields - text and title:
```
exports.up = (knex) => knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.text('text');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
exports.down = (knex) => knex.schema.dropTable('articles');
```
The above migration creates two functions named **up**(for running migration) and **down**(for rollback migration) which will be called when you run this migration. When you run this migration it will create an **articles** table with one string column and a text column. It also creates two timestamp fields to allow Nodos to track article creation and update times.

:::note
We use knex SQL query builder, see more information about [knex](https://github.com/knex/knex)
:::
At this point, you can use a nodos command to run the migration:
```
$ nodos db migrate
```

Nodos will execute this migration command and tell what happened.
```
Batch 1 run: 1 migrations
20201012203145_create_articles_table.js
```

### 5.5 Saving data in the controller

Back in **contollers/articles.js**, we need to change the **create** action to use the new **Article** model to save the data in the database. Open **app/controllers/articles.js** and change the create action to look like this:
```
import Article from '../entities/Article.js';
export const create = async (request, response, { router }) => {
  const { body } = request;
  const article = await Article.query().insert(body.article);

  response.redirectTo(router.route('article', article.id));
};
```
Here's what's going on: every Nodos model can be initialized with its respective attributes, which are automatically mapped to the respective database columns. In the first line we do just that (remember that body.article contains the attributes we're interested in), after that article will be created in database. Finally, we redirect the user to the show action, which we'll define later.
:::note
You might be wondering why the **A** in **Article** is capitalized above, whereas most other references to articles in this guide have used lowercase. In this context, we are referring to the class named **Article** that is defined in app/entities/Article.js. Class names in JavaScript must begin with a capital letter.
:::
If you now go to [http://localhost:3000/articles/new](http://localhost:3000/articles/new) you'll be able to create an article. Try it!

### 5.6 Showing Articles

As we have seen in the output of **nodos routes**, the route for **show** action is as follows:
```
article GET /articles/:id browser
```
The special syntax **:id** tells nodos that this route expects an **:id** parameter, which in our case will be the id of the article.

As we did before, open **app/controllers/articles.js** and its respective view. Given that, let's add the **show** action, as follows:
```
import Article from '../entities/Article.js';
export const show = async (request, response) => {
  const article = await Article.query().findById(request.params.id);
  response.render({ article });
};
```
A couple of things to note. We use **Article.query().findById** to find the article we're interested in, passing in **request.params.id** to get the **:id** parameter from the request. We do response.render({ article }) for pass article variable to view template.

:::note
**request.body** returns http body. **request.params** returns http query string params.
:::

Now, open file **app/templates/articles/build.pug** with the following content:
```
p
  strong Title:
  = article.title
p
  strong Text:
  = article.text
```
With this change, you should finally be able to create new articles. Visit [http://localhost:3000/articles/new](http://localhost:3000/articles/new) and give it a try!

### 5.7 Listing all articles

We still need a way to list all our articles, so let's do that. The route for this as per output of **nodos routes** is:
```
articles GET /articles browser
```
Add the corresponding **index** action for that route inside the **controllers/articles.js** file. When we write an index action. Let's do it:
```
import Article from '../entities/Article.js';
export const index = async (request, response) => {
  const articles = await Article.query();
  response.render({ articles });
};
```
And then finally, add the view for this action, located at **app/templates/articles/index.pug**:
```
h1 Listing Articles

table
  tr
    th Title
    th Text
    th
  each article in articles
    tr
      td= article.title
      td= article.text
      td
        a(href=route('article', article.id)) Show
```
Now if you go to [http://localhost:3000/articles](http://localhost:3000/articles) you will see a list of all the articles that you have created.

### 5.8 Adding Some Validation

The entity file, **app/entities/Article.js** is about as simple as it can get:
```
import { Model } from 'objection';
export default class Article extends Model {
  static get tableName() {
    return 'articles';
  }
}
```
There isn't much to this file - but note that the **Article** class inherits from **Model**. Objecttion **Model** which supplies a great deal of functionality to your Nodos entities for free, including basic database CRUD (Create, Read, Update, Destroy) operations, data validation, as well as sophisticated search support and the ability to relate multiple entity to one another.
:::note
See more about [objection](https://github.com/Vincit/objection.js)
:::
Nodos includes methods to help you validate the data that you send to entities. Open the **app/entities/article.js** file and edit it:
```
import { Model } from 'objection';
export default class Article extends Model {
  static get tableName() {
    return 'articles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        text: { type: 'text' },
        title: { type: 'string', minLength: 5 },
      },
    };
  }
}
```
These changes will ensure that all articles have a title that is at least five characters long. Nodos can validate a variety of conditions in a entity, including the presence or uniqueness of columns, their format, and the existence of associated objects.

With the validation now in place, when we call **insert** on an invalid article, it will throw an error. If **insert** fails in this situation, we need to show the form back to the user. To do this, change the **create** actions inside **app/controllers/articles.js** to these:
```
export const create = async (request, response, { router }) => {
  const { body } = request;
  const article = await Article.query().insert(body.article).catch(() => false);

  if (article instanceof Article) {
    response.redirectTo(router.route('article', article.id));
  } else {
    response.redirectTo(router.route('buildArticle'));
  }
};
```
# TODO render errors, need render buildArticle instead of redirectTo

### 5.9 Updating Articles

We've covered the "CR" part of CRUD. Now let's focus on the "U" part, updating articles.

The first step we'll take is adding an **edit** action to the **app/controllers/artictles.js**.
```
import Article from '../entities/Article.js';
export const edit = async (request, response) => {
  const article = await Article.query().findById(request.params.id);
  response.render({ article });
};
```
The view will contain a form similar to the one we used when creating new articles. Open **app/templates/articles/edit.pug** and make it look as follows:
```
form(action=route('article', article.id) method="post")
  input(type="hidden" name="_method" value="put")
  input(type="hidden" name="_csrf" value=csrfToken)
  div
    label title
    input(type="input" name="article[title]" value=article.title)
  div
    label text
    input(type="text" name="article[text]" value=article.text)
  div
    input(type="submit")
```
Next, we need to create the **update** action in **app/controllers/articles.js**:
```
import Article from '../entities/Article.js';
export const update = async (request, response, { router }) => {
  const { body, params } = request;
  const article = await Article.query().findById(params.id).patch(body.article).catch(() => false);

  if (article !== false) {
    response.redirectTo(router.route('article', params.id));
  } else {
    response.redirectTo(router.route('editArticle', params.id));
  }
};
```
The new action, **update**, is used when you want to update a record that already exists, and it accepts a hash containing the attributes that you want to update. As before, if there was an error updating the article we want to show the form back to the user.

Finally, we want to show a link to the **edit** action in the list of all the articles, so let's add that now to **app/templates/articles/index.pug** to make it appear next to the "Show" link:
```
h1 Listing Articles

table
  tr
    th Title
    th Text
    th
  each article in articles
    tr
      td= article.title
      td= article.text
      td
        a(href=route('article', article.id)) Show
        a(href=route('editArticle', article.id)) Edit
```
And we'll also add one to the **app/templates/articles/show.pug** template as well, so that there's also an "Edit" link on an article's page. Add this at the bottom of the template:
```
a(href=route('article', article.id)) Show
br
a(href=route('articles')) Back
```

### 5.10 Deleting Articles

We're now ready to cover the "D" part of CRUD, deleting articles from the database. Following the REST convention, the route for deleting articles as per output of **nodos routes** is:
```
article DELETE /articles/:id browser
```
The **delete** routing method should be used for routes that destroy resources. If this was left as a typical **get** route, it could be possible for people to craft malicious URLs like this:
```
<a href='http://example.com/articles/1/destroy'>look at this cat!</a>
```

We use the **delete** method for destroying resources, and this route is mapped to the **destroy** action inside **app/controllers/articles.js**. The **destroy** method is generally the last CRUD action in the controller, and like the other public CRUD actions. Let's add it:
```
import Article from '../entities/Article.js';
export const destroy = async (request, response, { router }) => {
  const { id } = request.params;
  await Article.query().deleteById(id);
  response.redirectTo(router.route('articles'));
};
```
Note that we don't need to add a view for this action since we're redirecting to the **index** action.

Finally, add a 'Destroy' link to your **index** action template (app/templates/articles/index.pug) to wrap everything together.
```
h1 Listing Articles

table
  tr
    th Title
    th Text
    th
  each article in articles
    tr
      td= article.title
      td= article.text
      td
        a(href=route('article', article.id)) Show
        a(href=route('editArticle', article.id)) Edit
        form(action=route('article', article.id) method="post")
          input(type="hidden" name="_method" value="delete")
          input(type="hidden" name="_csrf" value=csrfToken)
          input(type="submit" value="Destroy")
```
Congratulations, you can now create, show, list, update, and destroy articles.


### Feedback

You're encouraged to help improve the quality of this guide.

Please contribute if you see any typos or factual errors. To get started, you can read our documentation contributions section.

You may also find incomplete content or stuff that is not up to date. Please do add any missing documentation for master. Make sure to check Edge Guides first to verify if the issues are already fixed or not on the master branch. Check the Nodos Guides Guidelines for style and conventions.

If for whatever reason you spot something to fix but cannot patch it yourself, please open an issue.
