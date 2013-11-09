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
  'collections/Elements',
  'views/index',
  'resources/index',
  'text!templates/element.hbs',
  'handlebars',
], function (
    Backbone,
    Elements,
    Views, 
    Resources,
    tpl
) {
  console.log('Hello TAG2013!');
  var Elements = new Elements(Resources.elements);

  var Achievements = new Views.Achievements({collection: Resources.achievements});
  var Recipes = new Views.Recipes({collection: Resources.recipes});

  var Game = new Views.Game({ collection: Elements });

  Backbone.history.start();

  console.log(Handlebars.compile(tpl, {name:'blah', count:666}) );
});
