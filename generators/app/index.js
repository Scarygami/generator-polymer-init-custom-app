'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  _promptViews: function () {
    var prompts = [{
      type: String,
      name: 'title',
      message: 'Title of sub-page (leave empty to stop adding pages):'
    }, {
      type: String,
      name: 'route',
      message: 'Name of element/route: (' + this.props.prefix + '-...):'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props.views = this.props.views || [];
      if (Boolean(props.title) && Boolean(props.route)) {
        this.props.views.push({
          route: props.route,
          title: props.title
        });
        return this._promptViews();
      }
    }.bind(this));
  },
  prompting: function () {
    var basicPrompts = [{
      type: 'String',
      name: 'appName',
      message: 'Name of the app:',
      default: 'My App'
    }, {
      type: 'String',
      name: 'prefix',
      message: 'Prefix for all app elements:',
      default: 'my'
    }];

    return this.prompt(basicPrompts)
      .then(function (basicProps) {
        this.props = basicProps;
        var prompts = [{
          type: 'String',
          name: 'shell',
          message: 'Name of the shell element (' + basicProps.prefix + '-...):',
          default: 'app'
        }];
        return this.prompt(prompts);
      }.bind(this))
      .then(function (props) {
        this.props.shell = this.props.prefix + '-' + props.shell;
        return this._promptViews();
      }.bind(this));
  },

  writing: function () {
    if (!this.props.views || this.props.views.length === 0) {
      this.props.views = [{
        route: 'view1',
        title: 'View 1'
      }];
    }

    this.fs.copy(
      this.templatePath('static/**/*'),
      this.destinationPath()
    );

    this.fs.copyTpl(
      this.templatePath('dynamicContent/**/*'),
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('dynamicName/src/my-app.html'),
      this.destinationPath('src/' + this.props.shell + '.html'),
      this.props
    );

    this.props.views.forEach(function (view) {
      this.fs.copyTpl(
        this.templatePath('dynamicName/src/my-view.html'),
        this.destinationPath('src/' + this.props.prefix + '-' + view.route + '.html'),
        {
          prefix: this.props.prefix,
          route: view.route,
          title: view.title
        }
      );
    }.bind(this));

    this.props.views.forEach(function (view) {
      this.fs.copyTpl(
        this.templatePath('dynamicName/test/my-view.html'),
        this.destinationPath('test/' + this.props.prefix + '-' + view.route + '.html'),
        {
          prefix: this.props.prefix,
          route: view.route,
          title: view.title
        }
      );
    }.bind(this));

    this.fs.copyTpl(
      this.templatePath('dynamicName/src/my-icons.html'),
      this.destinationPath('src/' + this.props.prefix + '-icons.html'),
      this.props
    );

    this.fs.copy(
      this.templatePath('dynamicName/src/my-view404.html'),
      this.destinationPath('src/' + this.props.prefix + '-view404.html')
    );
  },

  install: function () {
    this.bowerInstall();
  }
});
