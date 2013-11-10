define([
  'backbone',
  'text!/templates/inventory.hbs',
  'jquery',
], function (Backbone, tpl, $) {
  return Backbone.View.extend({
    el: '.inventory-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.collection));
      return this;
    },
  });
});
