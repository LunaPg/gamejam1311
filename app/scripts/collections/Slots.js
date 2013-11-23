define(['backbone', 'models/Element'], function (Backbone, Element) {
  return Backbone.Collection.extend({
    model: Element.extend({ idAttribute: 'id', }),
    maxSize: 2,
    isFull: function () { return this.length >= this.maxSize },
  });
});