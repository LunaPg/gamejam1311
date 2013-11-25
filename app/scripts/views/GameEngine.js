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
  'text!/templates/game.hbs',
  'text!/templates/game-menu.hbs',
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
  tplGame,
  tplGameMenu,
  $, _
) {
  var tpl = {
    game: Handlebars.compile(tplGame),
    menu: Handlebars.compile(tplGameMenu),
  };

  return Backbone.View.extend({
    id: 'game',
    el: '#alchemystery',
    template: tpl.game,
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
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      this.$el.find('.menu-container').html(tpl.menu());
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

  });
});

