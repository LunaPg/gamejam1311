define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      status: 'locked',
      score: 0,
      count: 0,
      recipes: [],
    },
    unlock: function (){
      this.set('status', 'unlocked');
    },
    lock: function(){
      this.set('status', 'locked');
    },
    crafting: function(){
      this.set('status', 'crafting');
    },
    increase: function(){
      this.set('count', (this.get('count')+1) );
    },
    decrease: function(){
      if (this.get('count') == 0)
        return;
      this.set('count') =-1 ;
    },
    islocked: function(){
      return this.get('status') == 'locked'
    },
    isunlocked: function(){
      return this.get('status') == 'unlocked'
    },

  });
});
