define([
  'backbone',
  'jquery',
  'templates/index',
  'qtip',
], function (Backbone, $, Templates) {
  return Backbone.View.extend({
    el: '.npc.gnome',
    initialize: function (options) {
      this.activateTooltips();
      this.listenTo(options.game.vent, 'feedback', function (message) {
        this.say({message: message});
      }, this);

      this.listenTo(options.game.vent, 'craft:add', function () {
        //if ( options.game.table.slots.isFull() )
        //  this.say({message:'qip!'});
      }, this);
    },

    activateTooltips: function () {
      var $el = this.$el;
      // We'll encapsulate our .qtip() call in your .on() handler method
      $(document).on('mouseover', '[data-tooltip]', function(event) {
        // Bind the qTip within the event handler
        $(this).qtip({
          overwrite: true,
          content: {
            attr: 'data-tooltip',
          },
          position: {
            my: 'bottom right',
            at: 'top center',
            target: $el,
          },
          style: {
            classes: 'gnome-tip qtip qtip-default qtip-bootstrap',
            tip: true,
          },
          show: {
            event: event.type, // Use the same show event as the one that triggered the event handler
            ready: true, // Show the tooltip as soon as it's bound, vital so it shows up the first time you hover!
            solo: true,
          }
        }, event); // Pass through our original event to qTip
      })
    },

    //ry TODO replace this with qtips ! -- the gnome must actually say the message
    say: function (options) {
      if ( !options ) options = {};
      var options = {
        type: options.type || 'success',
        message: options.message
      };
      $('#alerts').append(Templates.feedback(options)).alert();
    }

  });
});

