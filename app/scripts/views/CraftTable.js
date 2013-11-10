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
      this.collection = new Collections.Elements(Resources.elements);
      this.recipes = new Collections.Recipes(Resources.recipes);

      this.render();
      //this.collection.get('earth').crafting();
      //this.collection.get('fire').crafting();
      //this.craft();
    },
    render: function () {
      this.$el.html(this.template(this.collection));
      return this;
    },

    craft: function () {
      var elements = this.collection.crafting();
      var newElement = this.recipes.craftWith(elements);
      console.log('new element?', newElement);
    },
  });
});
