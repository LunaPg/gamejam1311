/*global require*/
'use strict';

require.config({
  shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: [
          'underscore',
          'jquery'
        ],
        exports: 'Backbone'
      },
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/jquery',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore',
      handlebars: '../bower_components/handlebars/handlebars',
      bootstrap: 'vendor/bootstrap',
      text: '../bower_components/requirejs-text/text',
      templates: '../templates',
    }
});

require([
  'backbone',
  'models/Game',
  'collections/Elements',
  'views/index',
  'resources/index',
  'handlebars',
], function (
    Backbone,
    GameModel,
    Elements,
    Views, 
    Resources
) {
  console.log('TAG2013!');
  var Elements = new Elements(Resources.elements);

  var Achievements = new Views.Achievements({collection: Resources.achievements});
  var Recipes = new Views.Recipes({collection: Resources.recipes});

  var GameModel = new GameModel();
  var Game = new Views.Game({
    collection: Elements,
    model: GameModel,
  });
  Game.renderLayout();

  Backbone.history.start();
});
