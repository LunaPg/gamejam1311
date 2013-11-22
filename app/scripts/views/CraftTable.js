define([
  'backbone',
  'collections/index',
  'resources/index',
  'text!/templates/crafting-table.hbs',
  'text!/templates/element.hbs',
  'jquery',
], function (Backbone, Collections, Resources, tpl, tplElement, $) {
  return Backbone.View.extend({
    el: '.table-container',
    template: Handlebars.compile(tpl),
    events: {
      'click #craft': 'craft',
      'click .element': 'remove',
    },
    initialize: function (options) {
      this.game = options.game;
      this.recipes = new Collections.Recipes(Resources.recipes);
      this.slots = new Backbone.Collection();
      this.render();

      // use game event bus
      this.listenTo(this.game.vent, 'craft:add', this.onCraftAdd, this);
      this.listenTo(this.game.vent, 'craft', this.onCraft, this);
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      this.listenTo(this.slots, 'reset', this.render, this);
      this.listenTo(this.slots, 'remove', this.render, this);
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
      if ( this.slots.length ) this.renderSlots();
      return this;
    },

    renderSlots: function () {
      var container = this.$el.find('.slots');
      var tpl = Handlebars.compile(tplElement);
      var content = [];

      this.slots.each(function (elementModel){
        var json = elementModel.toJSON();
        //ry todo create a dedicated Slots Collection that extends the Element model and removes the idAttribute attribute
        json.icon = json.name.replace(' ', '-');
        content.push(tpl(json));
      });

      container.html(content);
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
      this.slots.push(element.toJSON());
      this.slots.last().set('count', '1');
    },

    onCraft: function (elements) {
      this.slots.reset();
    },

    onDrop: function (event, ui) {
      var element = this.collection.get(ui.draggable[0].getAttribute('data-id'));
      this.game.vent.trigger('craft:add', element);
      this.renderSlots();
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
