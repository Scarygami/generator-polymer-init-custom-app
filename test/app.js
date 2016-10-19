'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-polymer-init-custom-app:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts()
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'index.html',
      'src/my-view1.html',
      'src/my-app.html',
      'test/index.html',
      'test/my-view1.html'
    ]);
  });
});
