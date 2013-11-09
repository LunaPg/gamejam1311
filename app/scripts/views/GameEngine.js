define([
  'backbone',
  'views/index'
  'jquery',
  'underscore',
], function (Backbone, Views, $, _) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.eventBus = _.extend({}, Backbone.Events);

      this.inventory = new Views.Inventory({collection: options.elements});
      this.table = new Views.CraftTable({collection: options.elements});
      this.shop = new Views.Shop({collection: options.elements});
      
      this.score = new Views.Score({model: new Models.Score});
    },
  });
});
