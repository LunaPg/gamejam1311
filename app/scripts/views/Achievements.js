define([
	'backbone', 
	'collections/index',
  'resources/achievements',
	'jquery',
  'text!/templates/achievements.hbs'
], function (Backbone, Collections, Achievements, $, tpl) {
  return Backbone.View.extend({
    el: '.achievements-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
      this.collection = new Collections.Achievements(Achievements);
    },
    visible: false,
    toggle: function() {
      if (this.visible) {
        this.$el.html('');
        this.stopListening();
      } else {
			this.render()
			};
      this.visible = !this.visible;
    },
    render: function () {
      var json = {
        achievements : this.collection.map(function (item) { return item.serializeData() })
      };
      console.log(json);
      this.$el.html(this.template(json));
      return this;
    },

  });
});
