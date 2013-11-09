define([
  'resources/achievements',
  'resources/elements',
  'resources/recipes',
], function (
  Achievements,
  Elements,
  Recipes
) {
  return {
    achievements: Achievements,
    elements: Elements,
    recipes: Recipes,
  }
});
