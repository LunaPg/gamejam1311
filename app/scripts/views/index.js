define([
  'views/GameEngine',
  'views/CraftTable',
  'views/Inventory',
  'views/Score',
  'views/Golds',
  'views/Shop',
  'views/Recipes',
  'views/Achievements',
], function (
  Game,
  CraftTable,
  Inventory,
  Score,
	Golds,
  Shop,
  Recipes,
  Achievements
) {
  return {
    Game: Game,
    Table: CraftTable,
    Inventory: Inventory,
    Score: Score,
    Golds: Golds,
    Shop: Shop,
    Recipes: Recipes,
    Achievements: Achievements,
  }
});
