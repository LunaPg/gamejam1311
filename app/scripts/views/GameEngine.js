define([
  'backbone',
  'views/Inventory',
  'views/CraftTable',
  'views/Shop',
  'views/Score',
  'jquery',
  'underscore',
], function (
  Backbone,
  Inventory,
  CraftTable,
  Shop,
  Score,
  $, _) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.eventBus = _.extend({}, Backbone.Events);

      this.inventory = new Inventory({collection: options.elements});
      this.table = new CraftTable({collection: options.elements});
      this.shop = new Shop({collection: options.elements});
      
      this.score = new Score();
    },
  });
});
