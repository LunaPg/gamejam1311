define([
  'backbone',
  'text!/templates/inventory.hbs',
  'text!/templates/element.hbs',
  'jquery',
  'dragscroll',
], function (Backbone, tpl, tplElement, $) {
  return Backbone.View.extend({
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.setElement('.game');
      this.game = options.game;
      this.render();
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      this.listenTo(this.game.vent, 'unlock:element', this.render, this);
      this.listenTo(this.collection, 'change', this.renderElements, this);

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
          var json = item.toJSON()
          json.icon = item.icon();
          return json;
        })
      }
    },

    render: function () {
      this.$el.find('.inventory-container').html(tpl);
      this.dragScroll();
      this.renderElements();
      return this;
    },

    dragScroll: function () {
      this.$el.find('.inventory-container').scrollview();
      return;
    },

    renderElements: function () {
      var json = this.serializeData();
      var tpl = Handlebars.compile(tplElement);
      this.$el.find('.elements').empty();
      var self = this;
      _(json.elements).each(function (elementJSON) {
        self.$el.find('.elements').append(tpl(elementJSON));
      });

      this.$el.find('.element').each(function (index, el) {
        var element = self.collection.get(el.getAttribute('data-id'));
        if ( !element.get('count') ) return;
        $(el).draggable(self.draggableOptions());
      });
    },

    draggableOptions: function () {
      return {
        helper: 'clone',
        opacity: '0.8',
        revert: 'invalid',
        scope: 'craft',
        containment: 'parent',
      }
    },

  });
});
