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
      this.recipes = new Collections.Recipes(Resources.recipes);

      this.slots = new Backbone.Collection();

      this.render();

      this.listenTo(this.slots, 'add', function (element) {
        element.decrease();
      }, this);


      this.listenTo(this, 'craft', this.onCraft, this);
      this.listenTo(this, 'craft:success', this.onCraftSuccess, this);

      //ry debugging
      this.collection.get('earth').crafting();
      this.collection.get('fire').crafting();

      this.slots.add(this.collection.get('earth'));
      this.slots.add(this.collection.get('fire'));

      this.craft();
    },

    render: function () {
      this.$el.html(this.template(this.collection));
      return this;
    },

    craft: function () {
      var elements = this.slots.clone();
      this.trigger('craft');
      var newElement = this.recipes.craftWith(elements);
      if ( newElement ) 
        this.trigger('craft:success', {newElement: newElement, ingredients:elements}); 
      else
        this.trigger('craft:fail', {ingredients: elements});
    },
    
    onCraft: function (elements) {
      this.slots.reset();
    },

    onCraftSuccess: function (options) {
      console.log('crafted', options.newElement.get('name'), 'with', options.ingredients.map(function (item) { return item.get('name') }));
    }
  });
});
