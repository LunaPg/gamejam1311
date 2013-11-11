define([
  'backbone', 
  'collections/index',
  'resources/recipes',
  'jquery',
  'text!/templates/cook-book.hbs'
], function (Backbone, Collections, Recipes, $, tpl) {
  return Backbone.View.extend({
    el: '.cook-book-container',
    template: Handlebars.compile(tpl),

    visible: false,

    initialize: function (options) {
      this.game = options.game;
      this.collection = new Collections.Recipes(Recipes);
      this.listenTo(this.collection, 'all', function () {
        if ( this.visible ) this.render();
      }, this);

      this.listenTo(this.game.vent, 'craft:success', this.updateRecipe, this);
    },

    hide: function () {
      this.$el.html('');
      this.stopListening();
    },

    toggle: function() {
      if (this.visible) this.hide();
      else this.render();
      this.visible = !this.visible;
    },

    render: function () {
      var json = {
        recipes : this.collection.map(function (item) { return item.serializeData() })
      };
      this.$el.html(this.template(json));
      return this;
    },

    updateRecipe: function (options) {
      var recipe = this.collection.get(options.recipe);
      if ( !recipe.isLocked() ) return;
      this.game.vent.trigger('unlock:recipe', recipe);
    },

  });
});
