define(['backbone', 'models/Recipe'], function (Backbone, Recipe) {
  return Backbone.Collection.extend({
    model: Recipe,

    craftWith: function (elements) {
      return this.findRecipeFor(elements);
    },

    findRecipeFor: function (elements) {
      return this.find(function (recipe) {
        return recipe.checkAvailability(elements);
      });
    }
  });
});
