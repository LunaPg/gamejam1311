define([
  'backbone',
  'templates/index',
  'jquery',
  'dragscroll',
], function (Backbone, Templates, $) {
  return Backbone.View.extend({
    template: Templates.inventory,
    events: {
      //'click .element': 'clickToCrat',
    },

    initialize: function (options) {
      this.setElement('.game');
      this.game = options.game;
      this.render();
      this.listenTo(this.game.vent, 'craft:success', this.onCraftSuccess, this);
      //this.listenTo(this.game.vent, 'unlock:element', this.renderElements, this); //ry made obsolete by next line
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
      this.$el.find('.inventory-container').html(this.template());
      this.dragScroll();
      this.renderElements();
      this.$el.find('.inventory-container').animate({scrollLeft: 0}, 500);
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
      this.$el.find('.elements').empty();
      var self = this;
      _(json.elements).each(function (elementJSON) {
        self.$el.find('.elements').append(Templates.element(elementJSON));
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
        containment: '.game.row',
        scroll: false,
      }
    },

  });
});
