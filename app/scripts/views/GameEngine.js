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
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    renderLayout: function () {
      var options = { collection: this.collection };
      this.inventory = new Inventory(options);
      this.shop = new Shop(options);

      this.score = new Score();
      this.table = new CraftTable();
    },
  });
});
