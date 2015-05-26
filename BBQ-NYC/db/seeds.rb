# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts Dir.pwd

User.delete_all
Event.delete_all
Location.delete_all
Supply.delete_all
UserEvent.delete_all

user1 = User.create(name: "Julia Becker", email: "jcbecker26@gmail.com")
user2 = User.create(name: "Xavier Fernandex", email: "xavier@gmail.com")
user3 = User.create(name: "Kangil Lee", email: "klee@gmail.com")
user4 = User.create(name: "Adam Abdelaziz", email: "a.j.abdelaziz@gmail.com")

records = JSON.parse(File.read('./full-bbq-locations.json'))
records.each do |record|
  #puts record
  Location.create!(record)
end

event1 = Event.create(name: "Knope BBQ", hashtag: "nothorns", description: "Let's celebrate surviving WDI with burgers, brats, and booze!", date: "2015-06-09", time: "18:00:00", location_id: 1)

Supply.create(name: "Bratwurst", user_id: user1.id, event_id: event1.id)
Supply.create(name: "Mustard", user_id: user2.id, event_id: event1.id)
Supply.create(name: "Beer", user_id: user1.id, event_id: event1.id)

UserEvent.create(event_id: event1.id, user_id: user1.id, rsvp: true)
UserEvent.create(event_id: event1.id, user_id: user2.id, rsvp: true)
UserEvent.create(event_id: event1.id, user_id: user3.id, rsvp: false)
UserEvent.create(event_id: event1.id, user_id: user4.id)

