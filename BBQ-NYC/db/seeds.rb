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
Rsvp.delete_all

user1 = User.create(name: "Julia Becker", email: "jcbecker26@gmail.com")
user2 = User.create(name: "Xavier Fernandez", email: "xavier@crservers.com")
user3 = User.create(name: "Kangil Lee", email: "klee@gmail.com")
user4 = User.create(name: "Adam Abdelaziz", email: "a.j.abdelaziz@gmail.com")

records = JSON.parse(File.read('./full-bbq-locations.json'))
records.each do |record|
  Location.create!(record)
end

event1 = Event.create(name: "Knope BBQ", hashtag: "nothorns", description: "Let's celebrate surviving WDI with burgers, brats, and booze! Bacon ipsum dolor amet hamburger ham tongue pork belly venison pancetta alcatra pork. Rump ribeye pig shank, sirloin cow spare ribs chicken.", date: "June 10, 2015", time: "2:00 PM", location_id: Location.first.id)

Supply.create(name: "Bratwurst", user_id: user1.id, event_id: event1.id)
Supply.create(name: "Mustard", user_id: user2.id, event_id: event1.id)
Supply.create(name: "Beer", user_id: user1.id, event_id: event1.id)

Rsvp.create(event_id: event1.id, user_id: user1.id, rsvp: true)
Rsvp.create(event_id: event1.id, user_id: user2.id, rsvp: true)
Rsvp.create(event_id: event1.id, user_id: user3.id, rsvp: false)
Rsvp.create(event_id: event1.id, user_id: user4.id)

