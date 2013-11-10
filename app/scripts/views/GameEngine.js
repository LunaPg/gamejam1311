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

      this.listenTo(this.vent, 'craft:success', this.updateRecipes, this);
      this.listenTo(this.vent, 'unlock:recipe', function (recipe) {
        recipe.unlock();
      });
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
      this.inventory = new Inventory(options);
      this.shop = new Shop(options);
      this.table = new CraftTable(options);
      this.achievements = new Achievements(options);

    },

    bindLayout: function () {
      //ry WHY are these never triggered...???
      this.listenTo(this.vent, 'all', function () { console.log('YO', arguments) }, this);
      this.listenTo(this.vent, 'craft:success', function (options) {
        var newElement = this.collection.getCraftedWith(options.recipe);
        this.score.model.increase(newElement.get('score'));
      }, this);
    },

    showAchievements: function () {
      this.achievements.toggle();
    },

    showCookbook: function () {
      this.recipes.toggle();
    },

    updateRecipes: function (options) {
      var recipe = this.recipes.collection.get(options.recipe);
      if ( !recipe.isLocked() ) return;
      this.vent.trigger('unlock:recipe', recipe);
    },
  });
});

