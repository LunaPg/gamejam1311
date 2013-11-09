define([
  'views/GameEngine',
  'views/CraftTable',
  'views/Inventory',
  'views/Score',
  'views/Shop',
  'views/Recipes',
  'views/Achievements',
], function (
  Game,
  CraftTable,
  Inventory,
  Score,
  Shop,
  Recipes,
  Achievements
) {
  return {
    Game: Game,
    Table: CraftTable,
    Inventory: Inventory,
    Score: Score,
    Shop: Shop,
    Recipes: Recipes,
    Achievements: Achievements,
  }
});
