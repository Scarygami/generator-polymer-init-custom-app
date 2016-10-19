# generator-polymer-init-custom-app

This template is a starting point for building apps using Polymer Starter Kit,
with more customization options.

### Setup

##### Prerequisites

First, install
[Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli)
and generator-polymer-init-custom-app using
[npm](https://www.npmjs.com/)
(we assume you have pre-installed [node.js](https://nodejs.org/)).

    npm install -g polymer-cli
    npm install -g generator-polymer-init-custom-app

##### Initialize project from template

Generate your new project using `polymer init`:

    mkdir my-app
    cd my-app
    polymer init custom-app

You will have options to define your preferred naming for the app and
add a variable amount of pages.

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve --open
