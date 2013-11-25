define([
  'backbone',
  'templates/index',
  'jquery',
], function (Backbone, Templates, $) {
  return Backbone.View.extend({
    template: Templates.score,
    el: '.shop-container',
    visible: false,
    events: {
      'click .buy': 'buy'
    },
    initialize: function (options) {
      this.game = options.game;
      this.gold = options.gold;
      this.listenTo(this.collection, 'all', function (model, value) {
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
      return { items: items };
    },

    render: function () {
      var tpl = this.template(this.serializeData());
      this.$el.html(tpl);
    },

    buy: function(event){
      var elementName = event.currentTarget.getAttribute("data-id");
      var element = this.collection.get(elementName);
      if ( element.get('score') > this.gold.get('value') ) return;
      this.gold.decrease(element.get('score'));
      this.game.collection.get(elementName).increase();
    },
  });
});

