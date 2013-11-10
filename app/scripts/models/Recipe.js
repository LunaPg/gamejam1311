define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      status: 'locked',
      ingredients: [],
      icon: undefined,
    },
    idAttribute: 'name',
    unlock: function (){
      this.set('status', 'unlocked');
    },
    lock: function(){
      this.set('status', 'locked');
    },
    isLocked: function(){
      return this.get('status') == 'locked';
    },
    isUnlocked: function(){
      return this.get('status') == 'unlocked';
    },

    checkAvailability: function (elements) {
      var ingredients = this.get('ingredients');
      var elementNames = elements.map(function (el) { return el.get('name') });
      console.log(elements);

      if ( ingredients.length !== elements.length ) return false;

      return _(ingredients).every(function (ingredient) {
        return _(elementNames).contains(ingredient);
      });
    },
  });
});
