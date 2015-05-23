# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
Event.delete_all
Location.delete_all
Supply.delete_all
UserEvent.delete_all

user1 = User.create(name: "Julia Becker", email: "jcbecker26@gmail.com")
user2 = User.create(name: "Xavier Fernandex", email: "xavier@gmail.com")
user3 = User.create(name: "Kangil Lee", email: "klee@gmail.com")
user4 = User.create(name: "Adam Abdelaziz", email: "a.j.abdelaziz@gmail.com")

location1 = Location.create(name: "Prospect Park Bandshell", description: "Grills located on both sides of the Bandshell", photo_url: "http://www.nycgo.com/images/uploadedimages/thricenycvisitcom/events_final/prospectpark_v1_460x285.jpg", rating: 5, latitude: 40.660452, longitude: -73.968967)
location2 = Location.create(name: "East River Park", description: "Along FDR Drive at East 10th Street. Permit required.", photo_url: "http://upload.wikimedia.org/wikipedia/en/0/0d/East_River_State_Park.jpg", rating: 4, latitude: 40.715517, longitude: -73.975553)
location3 = Location.create(name: "Fort Washington Park", description: "North of West 158th Street on the Hudson River", photo_url: "http://www.mcmse.com/wp-content/gallery/fort-washington-park-demi-bastion-wall-repair/15-2437-1-ft-washington.jpg", rating: 5, latitude: 40.851537, longitude: -73.946754)

event1 = Event.create(name: "Knope BBQ", hastag: "nothorns", description: "Let's celebrate surviving WDI with burgers, brats, and booze!", date: 2015-06-09, time: 18:00:00, location_id: location1.id)

Supply.create(name: "Bratwurst", user_id: user1.id)
Supply.create(name: "Mustard", user_id: user2.id)
Supply.create(name: "Beer", user_id: user1.id)

UserEvent.create(event_id: event1.id, user_id: user1.id, rsvp: true)
UserEvent.create(event_id: event1.id, user_id: user2.id, rsvp: true)
UserEvent.create(event_id: event1.id, user_id: user3.id, rsvp: false)
UserEvent.create(event_id: event1.id, user_id: user4.id)

