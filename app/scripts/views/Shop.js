define([
  'backbone',
  'text!/templates/shop.hbs',
  'jquery',
], function (Backbone, tpl, $) {
  return Backbone.View.extend({
    template: Handlebars.compile(tpl),
    el: '.shop-container',
    visible: false,
    initialize: function (options) {
      this.game = options.game;
      this.listenTo(this.game.collection, 'all', function (model, value) {
        if ( this.visible ) this.render();
      }, this);
    },

    hide: function () {
      this.$el.html('');
    },

    toggle: function () {
      if ( this.visible ) this.hide();
      else this.render();
      this.visible = !this.visible;
    },

    serializeData: function () {
      var items = this.collection.toJSON();
      items = items.map(function (item) {
        item.locked = item.status === 'locked';
        return item;
      });
      console.log(items);
      return { items: items };
    },

    render: function () {
      var tpl = this.template(this.serializeData());
      this.$el.html(tpl);
    },
  });
});

