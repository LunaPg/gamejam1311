define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      locked: true,
      recipes: [],
      score: 0,
      count: 0,
    }
  });
});
