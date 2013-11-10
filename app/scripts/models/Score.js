define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      value: 0
    },
    increase: function (value) {
      this.set('value', this.get('value') + value);
    },
    compute: function (timeLeft) {
      return this.get('value') * timeLeft;
    }
  })
});
