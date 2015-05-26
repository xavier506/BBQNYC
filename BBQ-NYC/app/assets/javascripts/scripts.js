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
    urlRoot: 'api/events'
  });

  var User = Backbone.Model.extend({
    initialize: function(attributes, options) {
      this.event_id = options.event_id;
    },
    urlRoot: function() {
      return '/api/events/' + this.event_id + '/users'
    }
  });

  var EventCollection = Backbone.Collection.extend({
    url: 'api/events',
    model: Event
  });

  var EventFormView = Backbone.View.extend({
    el: $('#main'),
    template: $('script[data-id="create-event-view"]').text(),
    events: {
      'submit': 'createEvent'
    },
    render: function() {
      this.$el.html(_.template(this.template))
    },
    createEvent: function(event) {
      event.preventDefault();
      var host_name = $('[name="host-name"]').val();
      var host_email = $('[name="email"]').val();
      var name = $('[name="event-name"]').val();
      var date = $('#datepicker').val();
      var description = $('[name="description"]').val();

      // Remove "Time: " label from time value
      var time = $('.slider-time').html();
      time = time.slice(6, time.length)

      // Hashtags stored without # characters
      var hashtag = $('[name="hashtag"]').val();
      if (hashtag.charAt(0) === "#") {
        hashtag = hashtag.slice(1, hashtag.length)
      }

      var newEvent = {
        name: name,
        hashtag: hashtag,
        date: date,
        description: description,
        time: time
      }
      var e = new Event(newEvent);

      e.save(newEvent, {
        success: function() {
          var u = new User({
            name: host_name,
            email: host_email
          }, {
            event_id: e.get("id")
          });
          console.log(e.get("id"))
          u.save();
        }
      });


      // this.eventCollection.create(newEvent);

    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'create': 'createFormView'
    },
    index: function() {
      console.log("index hit")
      var locations = new LocationsCollection();
      window.locationsView = new LocationsCollectionView({
        el: $("#main"),
        collection: locations
      });
    },
    createFormView: function() {
      console.log("create event hit")

      var eventModel = new Event();

      var eventCollection = new EventCollection();
      var formView = new EventFormView({
        // el: $("#main")
        // collection: eventCollection
      });
      formView.render();
    }
  })

  var myRouter = new Router()
  Backbone.history.start()


  $(function() {
    $("#datepicker").datepicker();
  });

  $(function() {
    $("#slider").slider({
      animate: "slow",
      min: 480,
      max: 1320,
      step: 15,
      value: 840,
      slide: function(e, ui) {
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
    $("#radio").buttonset();
  });

});
