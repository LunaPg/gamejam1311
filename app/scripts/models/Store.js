define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      status: 'locked',
      price: 0,
			sell: 0,
    },
    icon: function(){
      return this.get('name').replace(' ','-');
    },
    idAttribute: 'name',
    unlock: function (){
      this.set('status', 'unlocked');
    },
		isLocked: function(){
      return this.get('status') == 'locked'
    },
    isUnlocked: function(){
      return this.get('status') == 'unlocked'
    },

  });
});
