define([
  'backbone',
  'views/Inventory',
  'views/CraftTable',
  'views/Shop',
  'views/Score',
  'views/Recipes',
  'views/Achievements',
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
  Recipes,
  Achievements,
  tpl,
  GameMenuTemplate,
  $, _
) {
  return Backbone.View.extend({
    id: 'game',
    el: '#alchemystery',
    template: Handlebars.compile(tpl),
    events: {
      'click .menu-entry-cook-book': 'showCookbook',
      'click .menu-entry-achievements': 'showAchievements'
    },
    initialize: function (options) {
      this.vent = _.extend({}, Backbone.Events);
      this.render();
      this.renderLayout();
      this.bindLayout();
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      var menuTpl = Handlebars.compile(GameMenuTemplate);
      this.$el.find('.menu-container').html(menuTpl());
      return this;
    },

    renderLayout: function () {
      var options = { collection: this.collection, game: this };
      this.score = new Score();
      this.recipes = new Recipes({game:this});
      this.achievements = new Achievements({game:this});
      this.inventory = new Inventory(options);
      this.shop = new Shop(options);
      this.table = new CraftTable(options);
    },

    bindLayout: function () {
      //ry debugging
      this.listenTo(this.vent, 'all', function () { console.log('YO', arguments) }, this);

      this.listenTo(this.vent, 'craft:success', function (options) {
        var newElement = this.collection.getCraftedWith(options.recipe);
        this.score.model.increase(newElement.get('score'));
        this.model.increaseRankTo(newElement.get('rank'));
      }, this);

      this.listenTo(this.vent, 'unlock:recipe', function (recipe) {
        alert('you have unlocked a new recipe: ' + recipe.get('name') );
        recipe.unlock();
      }, this);

      this.listenTo(this.model, 'change:rank', function (model, value) {
        var bonus = value * 100;
        alert('You earned '+ bonus + ' points for crafting your way up to rank '+value);
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

  });
});

