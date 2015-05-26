$(function() {

  console.log("scripts.js linked")

  // Testing with Ajax
  // var template = _.template($('script[data-id="location-modal-template"]').text())

  // $.ajax({
  //   url: '/api/locations'
  // }).done(function(locations) {
  //   console.log("ajax call done")
  //   var location = locations[0];
  //   console.log(template)
  //   $('#main').html(template(location))
  // });


  var Location = Backbone.Model.extend({

  });

  var LocationView = Backbone.View.extend({

  });

  var LocationModalView = Backbone.View.extend({
    template: $('script[data-id="location-modal-template"]').text(),


  });

  var Event = Backbone.Model.extend({
    urlRoot: '/api/events'
  })

  var EventCollection = Backbone.Collection.extend({

  });

  var EventFormView = Backbone.View.extend({
    initialize: function(options) {
      this.eventCollection = options.collection
    },
    template: $('script[data-id="create-event-view"]').text(),
    render: function() {
      this.$el.html(_.template(this.template))
    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'create': 'createEvent'
    },
    index: function() {
      console.log("index hit")

    },
    createEvent: function() {
      console.log("create event hit")
      var formView = new EventFormView({
        el: $("#main")
      });
      formView.render();
    }
  })

  var myRouter = new Router()
  Backbone.history.start()

// Notes:

// MODELS:
// - Location
// - Event
// - User
// - Supply

// COLLECTIONS:
// - Locations
// - Users
// - Supplies

// MODEL VIEWS:
// - Event
// - Location
// - Supply
// - User

// COLLECTION MODEL VIEWS:
// - Locations
// - Supplies
// - Users

// ROUTES
// - ''
// - '#create'
// - '#events/:id'


$(function() {
      $( "#datepicker" ).datepicker();
    });

    $(function() {
      $( "#slider" ).slider({
        animate: "slow",
        min: 480,
        max: 1320,
        step: 15,
        value: 840,
        slide: function (e, ui) {
            var hours = Math.floor(ui.value / 60);
            var minutes = ui.value - (hours * 60);
            if (hours.length == 1) hours = '0' + hours;
            if (minutes.length == 1) minutes = '0' + minutes;
            if (minutes == 0) minutes = '00';
            if (hours >= 12) {
                if (hours == 12) {
                    hours = hours;
                    minutes = minutes + " PM";
                } else {
                    hours = hours - 12;
                    minutes = minutes + " PM";
                }
            } else {
                hours = hours;
                minutes = minutes + " AM";
            }
            if (hours == 0) {
                hours = 12;
                minutes = minutes;
            }
            $('.slider-time').html('Time: ' + hours + ':' + minutes);
        }
      });
    });

  $(function() {
    $( "#radio" ).buttonset();
  });

  });