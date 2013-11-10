define(['backbone', 'models/Element'], function (Backbone, Element) {
  return Backbone.Collection.extend({
    model: Element,
    crafting: function () {
      return this.filter(function (item) {
        return item.isCrafting()
      })
    }
  });
});
