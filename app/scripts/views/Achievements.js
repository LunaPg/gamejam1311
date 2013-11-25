define([
  'backbone', 
  'collections/index',
  'resources/achievements',
  'jquery',
  'templates/index',
], function (Backbone, Collections, Achievements, $, Templates) {
  return Backbone.View.extend({
    el: '.achievements-container',
    template: Templates.achievements,
    initialize: function (options) {
      this.game = options.game;
      this.collection = new Collections.Achievements(Achievements);

      this.listenTo(this.collection, 'all', function () {
        if ( this.visible ) this.render();
      });
      this.listenTo(this.game.vent, 'craft:success', this.watchCraftedElements, this);
      this.listenTo(this.game.vent, 'unlock:achievement', this.unlock, this);
    },
    visible: false,

    watchCraftedElements: function (options) {
      var element = this.game.collection.get(options.recipe.get('name'));
      var achievement = this.collection.get(element.get('achievement'));
      if ( !achievement ) return;
      if ( achievement.isUnlocked() ) return;
      this.unlock(achievement);
    },

    unlock: function (achievement) {
      this.game.vent.trigger('feedback', 'You have unlocked a new achievement: '+achievement.get('description'));
      achievement.unlock();
      this.game.vent.trigger('unlock:achievement:' + achievement.get('id'));
    },

    toggle: function() {
      if (this.visible) {
        this.$el.html('');
        this.stopListening();
      } else {
      this.render()
      };
      this.visible = !this.visible;
    },

    render: function () {
      var json = {
        achievements : this.collection.map(function (item) { return item.serializeData() })
      };
      this.$el.html(this.template(json));
      return this;
    },

  });
});
