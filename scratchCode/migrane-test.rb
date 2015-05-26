require 'json'
records = JSON.parse(File.read('./full-bbq-locations.json'))
records.each do |record|
  puts record
  location1 = Location.create(name: "Prospect Park Bandshell", description: "Grills located on both sides of the Bandshell", photo_url: "http://www.nycgo.com/images/uploadedimages/thricenycvisitcom/events_final/prospectpark_v1_460x285.jpg", rating: 5, latitude: 40.660452, longitude: -73.968967, location: "Crotona Park East & Charlotte Street (Indian Lake)", address: "Prospect Park, Brooklyn, NY 11225, USA", website: "http://www.prospectpark.org/", property_id: "B073", hours: "10AM - 8PM, daily")
  # Location.create!(record)
end
  