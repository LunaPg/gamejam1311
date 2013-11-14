require.config({
  baseUrl: '../scripts/',
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
      }
    },
    paths: {
      jquery: '../bower_components/jquery/jquery',
      jqueryui: '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore',
      handlebars: '../bower_components/handlebars/handlebars',
      bootstrap: 'vendor/bootstrap',
      text: '../bower_components/requirejs-text/text',
      templates: '../templates',
    }
});

require([
  '../test/spec/resources',
], function () {
  jasmine.getEnv().execute();
});


