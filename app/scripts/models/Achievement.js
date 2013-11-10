define (['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: { 
      name: undefined,
      icon: undefined,
      description: undefined,   
      status: 'locked',
    },
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

  });
});
