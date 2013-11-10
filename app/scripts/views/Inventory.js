define([
  'backbone',
  'text!/templates/inventory.hbs',
  'jquery',
], function (Backbone, tpl, $) {
  return Backbone.View.extend({
    el: '.inventory-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.game = options.game;
      this.render();
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      window.inventory = this;
    },
    onCraftSuccess: function (options) {
     //ry ???
      this.collection.getCraftedWith(options.recipe).increase();
    },
    render: function () {
      this.$el.html(this.template(this.collection));
      return this;
    },
  });
});
