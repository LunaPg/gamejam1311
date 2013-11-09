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
        handlebars: '../bower_components/handlebars/handlebars.amd',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
  'backbone',
  'collections/Elements',
  'models/index',
  'views/GameEngine',
  'resources/index',
  'handlebars',
], function (
    Backbone,
    Elements,
    Models,
    Game, 
    Resources
) {
  console.log('Hello TAG2013!');
  var Elements = new Elements(Resources.elements);

  var Achievements = new Views.Achievements({collection: Resources.achievements});
  var Recipes = new Views.Recipes({collection: Resources.recipes});

  var Game = new Views.GameEngine({ collection: Elements });
  Backbone.history.start();
});
