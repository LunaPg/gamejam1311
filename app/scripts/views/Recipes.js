define([
	'backbone', 
	'collections/index',
	'resources/recipes',
	'jquery',
  'text!/templates/cook-book.hbs'
], function (Backbone, Collections, Recipes, $, tpl) {
  return Backbone.View.extend({
		el: '.cook-book-container',
    template: Handlebars.compile(tpl),
    initialize: function (options) {
		  this.collection = new Collections.Recipes(Recipes);
		  console.log('coucou');
    },
		visible: false,
		toggle: function() {
			if (this.visible) {
			  this.$el.html('');
				this.stopListening();
			} else this.render();
			this.visible = !this.visible;
		},
    render: function () {
		  var json = {
        recipes : this.collection.map(function (item) { return item.serializeData() })
			};
			console.log(json);
      this.$el.html(this.template(json));
      return this;
    },

  });
});