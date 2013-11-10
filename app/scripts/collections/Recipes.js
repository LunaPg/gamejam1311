define(['backbone', 'models/Recipe'], function (Backbone, Recipe) {
  return Backbone.Collection.extend({
    model: Recipe
  });
});
