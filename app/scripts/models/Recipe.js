define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      status: 'locked',
      elements: [],
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
      if ( this.get('elements').length !== elements.length ) return false;

      var self = this;
      //ry return recipe that matches exactly elements
      return _.reduce(elements, function (memo, el) {
        return memo && _(self.get('elements')).contains(el.get('name'))
      }, true)
    },
  });
});
