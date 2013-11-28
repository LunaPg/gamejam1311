define([
  'backbone',
  'jquery',
  'templates/index',
], function (Backbone, $, Templates) {
  return Backbone.View.extend({
    el: '.golds-container',
    template: Templates.golds,
    initialize: function (options) {
      this.model = options.gold;
      this.game = options.game;
      this.render();
      this.listenTo(options.game.vent, 'craft:success', this.onCraftSuccess, this)
      this.listenTo(this.model, 'change:value', this.render, this);
    },
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    onCraftSuccess: function(options){
      var element = this.game.collection.get(options.recipe.get('name'));
      return this.model.increase(3 * element.get('score'));
    },
  });
});

