define([
  'backbone',
  'text!/templates/inventory.hbs',
  'text!/templates/element.hbs',
  'jquery',
  'dragscroll',
], function (Backbone, tpl, tplElement, $) {
  return Backbone.View.extend({
    template: Handlebars.compile(tpl),
    events: {
      //'click .element': 'clickToCrat',
    },

    initialize: function (options) {
      this.setElement('.game');
      this.game = options.game;
      this.render();
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      this.listenTo(this.game.vent, 'unlock:element', this.render, this);
      this.listenTo(this.collection, 'change', this.renderElements, this);
      this.listenTo(this.game.vent, 'craft:remove', this.revertElement, this);

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

      //ry hack to start the game at left: 0
      var self = this;
      setTimeout(function () {
        self.$el.find('.inventory-container').scrollLeft(0);
      }, 200);
      return this;
    },

    dragScroll: function () {
      this.$el.find('.inventory-container').scrollview();
      return;
    },

    revertElement: function(element){
      this.collection.get(element).increase();
    },
    renderElements: function () {
      var json = this.serializeData();
      var tpl = Handlebars.compile(tplElement);
      this.$el.find('.elements').empty();
      var self = this;
      _(json.elements).each(function (elementJSON) {
        self.$el.find('.elements').append(tpl(elementJSON));
      });

      this.$el.find('.elements .element').each(function (index, el) {
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
