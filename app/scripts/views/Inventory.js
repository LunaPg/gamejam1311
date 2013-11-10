define([
  'backbone',
  'text!/templates/inventory.hbs',
  'text!/templates/element.hbs',
  'jquery',
], function (Backbone, tpl, tplElement, $) {
  return Backbone.View.extend({
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.setElement('.game');
      this.game = options.game;
      this.render();
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      this.listenTo(this.game.vent, 'unlock:element', this.render, this);
      window.inventory = this;
    },

    onCraftSuccess: function (options) {
      var element = this.collection.getCraftedWith(options.recipe);
      element.increase();
      if ( element.isUnlocked() ) return;
      element.unlock();
      this.game.vent.trigger('unlock:element', element);
    },

    serializeData: function () {
      return { elements: this.collection.getInventory().map(function (item) {
          return item.toJSON()
        })
      }
    },

    render: function () {
      this.$el.find('.inventory-container').html(tpl);
      this.renderElements();
      return this;
    },

    renderElements: function () {
      var json = this.serializeData();
      var tpl = Handlebars.compile(tplElement);
      this.$el.find('.elements').empty();
      var $el = this.$el;
      _(json.elements).each(function (elementJSON) {
        $el.find('.elements').append(tpl(elementJSON));
      });
    }
  });
});
