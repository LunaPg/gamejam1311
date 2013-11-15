define([
  'backbone',
  'jquery',
  'text!/templates/golds.hbs'
], function (Backbone, $, tpl) {
  return Backbone.View.extend({
    el: '.golds-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.render();
      this.listenTo(this.model, 'change:value', this.render, this);
    },
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
  });
});

