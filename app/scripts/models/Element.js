define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      status: 'locked',
      score: 0,
      count: 0,
      rank: 0,
      recipes: [],
      achievement: undefined,
    },
    icon: function(){
      return this.get('name').replace(' ','-');
    },
    idAttribute: 'name',
    unlock: function (){
      this.set('status', 'unlocked');
    },
    increase: function(){
      this.set('count', this.get('count') + 1);
      console.log('you now have +1', this.get('name'));
    },
    decrease: function(){
      if ( this.get('count') == 0 ) return;
      this.set('count', this.get('count') - 1);
      console.log("you now have -1", this.get('name'));
    },
    isCrafting: function () {
      return this.get('status') == 'crafting'
    },
    isLocked: function(){
      return this.get('status') == 'locked'
    },
    isUnlocked: function(){
      return this.get('status') == 'unlocked'
    },

    toJSON: function () { //ry overload the toJSON method
      var json = _.clone(this.attributes);
      json.icon = this.icon();
      return json;
    },
  });
});
