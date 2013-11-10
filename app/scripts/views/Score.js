define([
  'backbone',
  'models/Score',
  'jquery',
  'text!/templates/score.hbs'
], function (Backbone, Score, $, tpl) {
  return Backbone.View.extend({
    el: '.score-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.model = new Score();
      this.render();
      this.listenTo(this.model, 'change:value', this.render, this);
    },
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
  });
});

