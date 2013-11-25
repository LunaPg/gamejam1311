define([
  'backbone',
  'views/Inventory',
  'views/CraftTable',
  'views/Shop',
  'views/Score',
  'views/Golds',
  'views/Recipes',
  'views/Achievements',
  'views/Gnome',
  'templates/index',
  'jquery',
  'underscore',
], function (
  Backbone,
  Inventory,
  CraftTable,
  Shop,
  Score,
  Golds,
  Recipes,
  Achievements,
  Gnome,
  Templates,
  $, _
) {
  return Backbone.View.extend({
    id: 'game',
    el: '#alchemystery',
    template: Templates.game,
    events: {
      'click .menu-entry.cook-book': 'showCookbook',
      'click .menu-entry.achievements': 'showAchievements',
      'click .menu-entry.shop': 'showShop',
    },

    initialize: function (options) {
      this.vent = _.extend({}, Backbone.Events);
      this.goldModel = options.gold;
      this.render();
      this.renderLayout();
      this.bindLayout();

      //ry dev cheat codes
      this.enableCheatCodes();
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      this.$el.find('.menu-container').html(Templates.gameMenu());
      return this;
    },

    renderLayout: function () {
      var options = { collection: this.collection, game: this, gold: this.goldModel};
      this.score = new Score();
      this.gold = new Golds(options);
      this.recipes = new Recipes({game:this});
      this.achievements = new Achievements({game:this});
      this.inventory = new Inventory(options);
      this.shop = new Shop(options);
      this.table = new CraftTable(options);
      this.gnome = new Gnome(options);
    },

    bindLayout: function () {
      //ry debugging
      this.listenTo(this.vent, 'all', function () { console.log('YO', arguments) }, this);

      this.listenTo(this.vent, 'craft:success', function (options) {
        var newElement = this.collection.getCraftedWith(options.recipe);
        this.score.model.increase(newElement.get('score'));
        this.model.increaseRankTo(newElement.get('rank'));
      }, this);

      this.listenTo(this.vent, 'craft:fail', function (options) {
        if ( !options.ingredients.length ) return;
        var dust = this.collection.get('dust');
        if ( dust.isLocked() ) dust.unlock();
        dust.increase();
      }, this);

      this.listenTo(this.vent, 'unlock:recipe', function (recipe) {
        this.vent.trigger('feedback', 'You have unlocked a new recipe: ' + recipe.get('name') );
        recipe.unlock();
      }, this);

      this.listenTo(this.model, 'change:rank', function (model, value) {
        var bonus = value * 100;
        this.vent.trigger('feedback', 'You earned '+ bonus + ' points for crafting your way up to rank '+value);
        this.score.model.increase(bonus);
        var achievement = this.achievements.collection.get('rank'+value);
        this.vent.trigger('unlock:achievement', achievement);
        this.$el.find('.cabinet.rank' + value).removeClass('locked');
      });
    },

    showAchievements: function () {
      this.achievements.toggle();
    },

    showCookbook: function () {
      this.recipes.toggle();
    },

    showShop: function () {
      this.shop.toggle();
    },

    enableCheatCodes: function () {
      var self = this;
      var cheats = {
        giveMe: function (element, value) {
          self.collection.get(element).set('count', value || 100);
        },

        unlockAll: function () {
          self.collection.each(function(item){
            self.$el.find('.cabinet').removeClass('locked');
            item.set('status', 'unlocked');
            item.set('count', 10);
          })
        }
      };
      window.cheatcode = cheats;
    },

  });
});

