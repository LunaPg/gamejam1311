define(['backbone', 'models/Achievement'], function (Backbone, Achievement) {
  return Backbone.Collection.extend({
    model: Achievement,
  });
});
