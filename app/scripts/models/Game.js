define([
  'backbone',
], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      rank: 0
    },

    increaseRankTo: function (rank) {
      if ( rank > this.get('rank') ) this.set('rank', rank);
    },
  });
});
