define(['resources/index', 'collections/index', 'underscore'], function (Resources, Collections, _) {
  describe('Resources validation', function () {
    var Elements, Recipes;
    beforeEach(function () {
      Elements = new Collections.Elements(Resources.elements);
      Recipes = new Collections.Recipes(Resources.recipes);
    });

    it('Player should be able to craft LIFE', function () {
      // recurse from life to basic elements, makine sure every recipe has craftable elements (except dust and basic elements)
      var goal = 'life';

      var check = function (recipe) {
        return _.every(recipe.get('ingredients'), function (element) {
          console.log(recipe.get('name'), 'needs', element);

          if ( !Recipes.get(element) ) {
            var basicElements = ['earth', 'wind', 'fire', 'water', 'dust'];
            //console.log('found', element, 'for', recipe.get('name'));
            return _.contains(basicElements, element);
          }
          return check(Recipes.get(element));
        });
      };

      expect(check(Recipes.get(goal))).toBeTruthy();
    });
  });
});




