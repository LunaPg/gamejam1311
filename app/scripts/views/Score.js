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
    },
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
  });
});

