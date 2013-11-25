define([
  'backbone',
  'models/Score',
  'jquery',
  'templates/index',
], function (Backbone, Score, $, Templates) {
  return Backbone.View.extend({
    el: '.score-container',
    template: Templates.score,
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

