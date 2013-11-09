define (['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: { 
      name: undefined,
      icon: undefined,
      description: undefined,   
      status: undefined,
    },
    unlock: function (){
      this.set('status', 'unlocked');
    },
    lock: function(){
      this.set('status', 'locked');
    },
    islocked: function(){
      return this.get('status') == 'locked';
    },
    isunlocked: function(){
      return this.get('status') == 'unlocked';
    },

  });
});
