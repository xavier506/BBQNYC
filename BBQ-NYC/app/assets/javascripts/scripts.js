$(function() {

  console.log("scripts.js linked")

  // ------------------------- Models -------------------------
  var Location = Backbone.Model.extend({
    urlRoot: "/api/locations"
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

  // ------------------------- Collections -------------------------
  var LocationsCollection = Backbone.Collection.extend({
    model: Location,
    url: '/api/locations'
  });

  var EventCollection = Backbone.Collection.extend({
    url: 'api/events',
    model: Event
  });

  // ------------------------- Collection Views -------------------------
  var LocationsCollectionView = Backbone.View.extend({

    initialize: function() {
      console.log("location collection view initialized");
      this.listenTo(this.collection, 'reset', this.render);
      this.collection.fetch({
        reset: true
      });
    },

    template: _.template($('script[data-id="map-view"]').html()),

    initializeMap: function() {

      this.map = new google.maps.Map(this.$el.find('#map-canvas')[0], {
        center: new google.maps.LatLng(40.740000, -73.940000),
        zoom: 10,
        // Snazzy Maps Style
        styles: [{
          "featureType": "landscape",
          "stylers": [{
            "hue": "#FFA800"
          }, {
            "saturation": 0
          }, {
            "lightness": 0
          }, {
            "gamma": 1
          }]
        }, {
          "featureType": "road.highway",
          "stylers": [{
            "hue": "#53FF00"
          }, {
            "saturation": -73
          }, {
            "lightness": 40
          }, {
            "gamma": 1
          }]
        }, {
          "featureType": "road.arterial",
          "stylers": [{
            "hue": "#FBFF00"
          }, {
            "saturation": 0
          }, {
            "lightness": 0
          }, {
            "gamma": 1
          }]
        }, {
          "featureType": "road.local",
          "stylers": [{
            "hue": "#00FFFD"
          }, {
            "saturation": 0
          }, {
            "lightness": 30
          }, {
            "gamma": 1
          }]
        }, {
          "featureType": "water",
          "stylers": [{
            "hue": "#00BFFF"
          }, {
            "saturation": 6
          }, {
            "lightness": 8
          }, {
            "gamma": 1
          }]
        }, {
          "featureType": "poi",
          "stylers": [{
            "hue": "#679714"
          }, {
            "saturation": 33.4
          }, {
            "lightness": -25.4
          }, {
            "gamma": 1
          }]
        }]
      });

      var image = {
        url: 'assets/sausage.png',
        // This marker is 30 pixels wide by 30 pixels tall.
        size: new google.maps.Size(30, 30),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the fork at 15,30.
        anchor: new google.maps.Point(15, 30)
      };

      function infoWindow(marker, map, park) {

        google.maps.event.addListener(marker, 'click', function() {
          var html = "<div><img src='" + park.photo_url + "' /><h3>" + park.name + "</h3><p>location: " + park.location + "<br/><em>address: " + park.address + "</em></p><p>description: " + park.description + "</p><p>hours: " + park.hours + "</p><p>rating: " + park.rating + "</p><p><a href='" + park.website + "' target='_blank'>visit park website</a></p><button>Grill Here</button></div>";
          iw = new google.maps.InfoWindow({
            content: html,
            maxWidth: 350
          });
          iw.open(map, marker);
        });
      }

      this.collection.each(function(park) {
        var parkLatLng = new google.maps.LatLng(park.get('latitude'), park.get('longitude'));

        var circle = new google.maps.Circle({
          center: parkLatLng,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: this.map,
          radius: 500
        });

        var marker = new google.maps.Marker({
          position: parkLatLng,
          map: this.map,
          icon: image,
          title: park.get('name'),
          zIndex: 10

        });

        infoWindow(marker, this.map, park.toJSON());
      }.bind(this));

    },

    render: function() {
      this.$el.html(this.template());
      this.initializeMap();
    }
  });

  // ------------------------- Other Views -------------------------
  // Create Event Page View
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
    }
  });

  // Create Event Show View
  var EventShowView = Backbone.View.extend({
    model: Event,
    el: $('#main'),
    template: $('script[data-id="event-show-view"]').text(),
    render: function() {
      this.$el.html(_.template(this.template, this.model))
    }

  });

  // ------------------------- Router -------------------------
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'create?location_id=:id': 'createFormView',
      'events/:id': 'showEventView'
    },
    index: function() {
      console.log("index hit")
      var locations = new LocationsCollection();
      window.locationsView = new LocationsCollectionView({
        el: $("#main"),
        collection: locations
      });
    },
    createFormView: function(id) {
      console.log(id);
      console.log("create event hit")

      var eventModel = new Event();

      var eventCollection = new EventCollection();
      var formView = new EventFormView({});
      formView.render();
    },
    showEventView: function(event_id) {
      console.log("show event hit")
      console.log(event_id)

      var barbecue = new Event({id: event_id})
      barbecue.fetch();
      //console.log(barbecue)
      var barbecueView = new eventShowView({model: barbecue}); 
    }
  })

  var myRouter = new Router()
  Backbone.history.start()

  // ------------------------- jQuery UI stuff -------------------------
  // Create Event Datepicker
  $(function() {
    $("#datepicker").datepicker();
  });
  // Create Event Time Slider
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
  // Event Detail RSVP Radio Button
  $(function() {
    $("#radio").buttonset();
  });

});