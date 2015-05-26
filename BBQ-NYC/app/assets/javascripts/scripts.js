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

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
    },
    index: function() {
      console.log("index hit")

    }
  })

  var myRouter = new Router()
  Backbone.history.start()

});

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