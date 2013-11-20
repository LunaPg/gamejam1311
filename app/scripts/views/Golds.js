define([
  'backbone',
  'jquery',
  'text!/templates/golds.hbs'
], function (Backbone, $, tpl) {
  return Backbone.View.extend({
    el: '.golds-container',
    template: Handlebars.compile(tpl),
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
			return this.model.increase(element.get('score'));
		},
  });
});

