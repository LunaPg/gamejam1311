define([
  'backbone',
  'views/Inventory',
  'views/CraftTable',
  'views/Shop',
  'views/Score',
  'text!/templates/game.hbs',
  'jquery',
  'underscore',
], function (
  Backbone,
  Inventory,
  CraftTable,
  Shop,
  Score,
  tpl,
  $, _) {
  return Backbone.View.extend({
    id: 'game',
    el: '#alchemystery',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.eventBus = _.extend({}, Backbone.Events);
      console.log('game:',this.template());
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    renderLayout: function () {

      this.inventory = new Inventory({
        collection: this.collection
      });

      this.table = new CraftTable({
        collection: this.collection
      });

      this.shop = new Shop({
        collection: this.collection
      });
      
      this.score = new Score();
    },
  });
});
