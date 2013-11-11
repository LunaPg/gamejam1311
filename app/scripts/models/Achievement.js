define (['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: { 
      id: undefined,
      name: undefined,
      icon: undefined,
      description: undefined,   
      status: 'locked',
    },
    unlock: function (){
      this.set('status', 'unlocked');
    },
    isLocked: function(){
      return this.get('status') == 'locked';
    },
    isUnlocked: function(){
      return this.get('status') == 'unlocked';
    },
    serializeData: function () {
      var json = this.toJSON();
      json.locked = this.isLocked();
      return json;
    },

  });
});
