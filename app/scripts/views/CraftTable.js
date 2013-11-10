define([
  'backbone',
  'collections/index',
  'resources/index',
  'text!/templates/crafting-table.hbs',
  'jquery',
], function (Backbone, Collections, Resources, tpl, $) {
  return Backbone.View.extend({
    el: '.table-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.game = options.game;
      this.recipes = new Collections.Recipes(Resources.recipes);
      this.slots = new Backbone.Collection();

      this.render();

      this.listenTo(this.slots, 'add', function (element) {
        element.decrease();
      }, this);

      // use game event bus
      this.listenTo(this.game.vent, 'craft', this.onCraft, this);
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
    },

    render: function () {
      this.$el.html(this.template(this.collection));
      return this;
    },

    craft: function () {
      var elements = this.slots.clone();
      this.game.vent.trigger('craft');
      var recipe = this.recipes.craftWith(elements);
      if ( recipe )
        this.game.vent.trigger('craft:success', {recipe: recipe, ingredients:elements}); 
      else
        this.game.vent.trigger('craft:fail', {ingredients: elements});
    },

    onCraft: function (elements) {
      this.slots.reset();
    },

    onCraftSuccess: function (options) {
      console.log('crafted', options.recipe.get('name'), 'with', options.ingredients.map(function (item) { return item.get('name') }));
    }
  });
});
