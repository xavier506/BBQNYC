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
    urlRoot: "/api/locations"
  });

  var LocationsCollection = Backbone.Collection.extend({
    model: Location,
    url: '/api/locations'
  });

  var LocationsCollectionView = Backbone.View.extend({
    initialize: function(options){
      console.log("location collection view initialized");
      console.log(options.collection.models)
      this.listenTo(this.collection, 'reset', this.render);
      this.collection.fetch({reset: true});
      
    },

    template: _.template($('script[data-id="map-view"]').html()),

    initializeMap: function() {
      this.map = new google.maps.Map( this.$el.find('#map-canvas')[0], {
        center: new google.maps.LatLng(40.740000, -73.940000),
        zoom: 10,
        // Snazzy Maps Style
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}]
      });
    },

    render: function(){
      this.$el.html(this.template({locations: this.collection.models}));
      this.initializeMap();

    }
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
      var locations = new LocationsCollection();
      window.locationsView = new LocationsCollectionView({
        el: $("#main"),
        collection: locations
      });
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