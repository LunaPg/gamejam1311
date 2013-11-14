define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      value: 5,
			icon: 'gold'
    },
    increase: function (value) {
      this.set('value', this.get('value') + value);
    },
    decrease: function (value) {
      return this.set('value', this.get('value')- value) ;
    }
  })
});
