define([
  'backbone',
  'collections/index',
  'resources/index',
  'text!/templates/crafting-table.hbs',
  'text!/templates/element.hbs',
  'jquery',
], function (Backbone, Collections, Resources, tpl, tplElement, $) {
  var tpl = {
    element: Handlebars.compile(tplElement),
    view: Handlebars.compile(tpl),
  };

  return Backbone.View.extend({
    el: '.table-container',
    template: tpl.view,
    events: {
      'click #craft': 'craft',
      'click .element': 'remove',
    },

    initialize: function (options) {
      this.game = options.game;
      this.recipes = new Collections.Recipes(Resources.recipes);
      this.slots = new Collections.Slots();
      this.render();

      // use game event bus
      this.listenTo(this.game.vent, 'craft:add', this.onCraftAdd, this);
      this.listenTo(this.game.vent, 'craft', this.onCraft, this);
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      this.listenTo(this.slots, 'add remove reset', this.renderSlots, this);
      this.listenTo(this.game.vent, 'unlock:achievement:rank1', this.increaseSlots, this);
      this.listenTo(this.game.vent, 'unlock:achievement:rank3', this.increaseSlots, this);
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
      this.$el.html(this.template(this.slots));
      this.$el.find('.slots').droppable(this.droppableOptions());
      if ( !this.slots.isEmpty() ) this.renderSlots();
      return this;
    },

    renderSlots: function () {
      var container = this.$el.find('.slots');
      container.find('.slot').html('');

      this.slots.each(function (elementModel, index){
        container.find('.slot-' + index).html(tpl.element(elementModel.toJSON()));
      });

      container.droppable(this.slots.isFull() ? 'disable' : 'enable');
      return this;
    },

    increaseSlots: function () { this.slots.maxSize += 1; },

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
      var json = element.toJSON();
      json.count = 1;
      this.slots.add(json);
    },

    onCraft: function (elements) { this.slots.reset(); },

    onDrop: function (event, ui) {
      var element = this.collection.get(ui.draggable[0].getAttribute('data-id'));
      if ( this.slots.isFull() ) return;
      this.game.vent.trigger('craft:add', element);
      //this.$el.find('.slots').append($(ui.draggable).clone());
    },

    remove: function (event){
      var elementName = event.currentTarget.getAttribute('data-id');
      var Element = this.slots.findWhere({name:elementName});
      this.slots.remove(Element);
      this.game.vent.trigger('craft:remove', elementName);
    },

    onCraftSuccess: function (options) {
      console.log('crafted', options.recipe.get('name'), 'with', options.ingredients.map(function (item) { return item.get('name') }));
    }
  });
});
