define(['backbone', 'models/Element'], function (Backbone, Element) {
  return Backbone.Collection.extend({
    model: Element,
    crafting: function () {
      return this.filter(function (item) {
        return item.isCrafting()
      })
    },
    getCraftedWith: function (recipe) {
      return this.get(recipe.get('name'));
    },
    getInventory: function () {
      return this.filter(function (item) {
        return item.isUnlocked();
      });
    },
  });
});
