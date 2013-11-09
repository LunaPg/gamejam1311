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
    'models/Element',
    'handlebars',
], function (Backbone, Element) {
    Backbone.history.start();
    console.log('Hello from Backbone!');
    var element = new Element();
    var elementCollection = Backbone.Collection.extend({
      model: Element
    });
    var myElementCollection = new elementCollection();

    myElementCollection.add({});
    myElementCollection.add({ name: "manamour" });
console.log(myElementCollection);
console.log(element);
});
