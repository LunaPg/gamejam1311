define(['backbone', 'models/Element'], function (Backbone, Element) {
  return Backbone.Collection.extend({
    model: Element
  });
});
