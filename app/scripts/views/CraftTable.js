define([
  'backbone',
  'text!/templates/crafting-table.hbs',
  'jquery',
], function (Backbone, tpl, $) {
  return Backbone.View.extend({
    el: '.table-container',
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
