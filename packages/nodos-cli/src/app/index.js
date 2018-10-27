const Generator = require('yeoman-generator');

export default class extends Generator {
  // The name `constructor` is important here
  // constructor(args, opts) {
  //   // Calling the super constructor is important so our generator is correctly set up
  //   super(args, opts);
  // }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('app/index.js'),
    );
  }
}
