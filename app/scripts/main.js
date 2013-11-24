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
      jqueryui: {
        deps: [ 'jquery' ],
        exports: 'jqueryui'
      },
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      },
      qtip: {
        deps: ['jquery'],
        exports: 'qtip',
      },
    },
    paths: {
      jquery: '../bower_components/jquery/jquery',
      jqueryui: '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore',
      handlebars: '../bower_components/handlebars/handlebars',
      qtip: '../bower_components/qtip2/jquery.qtip.min',

      bootstrap: 'vendor/bootstrap',
      dragscroll: 'vendor/jquery.scrollview',

      text: '../bower_components/requirejs-text/text',
      templates: '../templates',
    }
});

require([
  'backbone',
  'models/Game',
  'models/Gold',
  'collections/Elements',
  'views/index',
  'resources/index',
  'handlebars',
  'jqueryui',
  'bootstrap',
  'qtip',
], function (
    Backbone,
    GameModel,
    Gold,
    Elements,
    Views, 
    Resources
) {
  console.log('TAG2013!');
  var Elements = new Elements(Resources.elements);

  //var Achievements = new Views.Achievements({collection: Resources.achievements});
  //var Recipes = new Views.Recipes({collection: Resources.recipes});

  var Game = new Views.Game({
    collection: Elements,
    model: new GameModel(),
    gold: new Gold(),
  });


  Backbone.history.start();

  //ry debugging
  //Game.table.slots.add(Game.collection.get('earth'));
  //Game.table.slots.add(Game.collection.get('fire'));

  //Game.table.craft();
});
