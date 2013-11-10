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

      // use game event bus
      this.listenTo(this.game.vent, 'craft:add', this.onCraftAdd, this);
      this.listenTo(this.game.vent, 'craft', this.onCraft, this);
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
    },

    droppableOptions: function () {
      return {
        scope: 'craft',
        tolerance: 'touch',
        activeClass: 'ui-state-hover',
        hoverClass: 'ui-state-active',
        drop: this.onDrop.bind(this),
      }
    },

    render: function () {
      this.$el.html(this.template(this.collection));
      this.$el.find('.slots').droppable(this.droppableOptions());
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

    onCraftAdd: function (element) {
      this.collection.get(element).decrease();
      this.slots.add(element.clone());
    },

    onCraft: function (elements) {
      this.slots.reset();
    },

    onDrop: function (event, ui) {
      var element = this.collection.get(ui.draggable[0].getAttribute('data-id'));
      this.game.vent.trigger('craft:add', element);
      this.$el.find('.slots').append($(ui.draggable).clone());
    },

    onCraftSuccess: function (options) {
      console.log('crafted', options.recipe.get('name'), 'with', options.ingredients.map(function (item) { return item.get('name') }));
    }
  });
});
