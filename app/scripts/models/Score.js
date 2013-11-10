define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      value: 0
    },
    increase: function (value) {
      console.log(this.get('value'), value);
      this.set('value', this.get('value') + value);
      console.log('score:', this.get('value'));
    },
    compute: function (timeLeft) {
      return this.get('value') * timeLeft;
    }
  })
});
