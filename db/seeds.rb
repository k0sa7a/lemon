# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require 'nokogiri'

puts "Clearing Database..."

ListItem.destroy_all
Location.destroy_all
Itinerary.destroy_all
Coach.destroy_all
User.destroy_all

puts "Creating a new database..."

url = "https://www.skateparks.co.uk/london/"
html_file = URI.open(url).read
html_doc = Nokogiri::HTML(html_file)

descriptions = []
addresses = []
html_doc.search('.park-archive.location-archive div a').each do |element|
  link = element.attr('href')
  html_f = URI.open(link).read
  html_d = Nokogiri::HTML(html_f)
  html_d.search('.sp-description p').each do |e|
    descriptions << e.text.strip
  end
  html_d.search('#content-1').each do |e|
    addresses << e.text.strip.gsub(/\r\n/, ' ').gsub(/(\n\t*)*Open in Google Maps/, '')
  end
end


titles = []
html_doc.search('.info h3').each do |element|
  titles << element.text.strip
end


arr = [1, 2, 3]
images = []
html_doc.search('.image img').each do |element|
  if element.attr('src') == "https://www.skateparks.co.uk/wp-content/themes/FoundationSkate/assets/img/placeholder.png"
    image_url = "app/assets/images/stock_location#{arr.sample}.jpg"
  else
    image_url = element.attr('src')
  end
  # image_url.slice!("360_50_")
  images << image_url
end

# create two users so that we can link them with our plants
first_user_hash = { first_name: "Alfonso", email: "test@test.test", address: "10 Downing St, London", password: "123456", skater_level: "Expert"}
second_user_hash = { first_name: "Galadriel", email: "test1@test.test", address: "138 Kingsland Rd, London", password: "654321",skater_level: "Beginner"}
third_user_hash = { first_name: "Paolo", email: "test2@test.test", address: "23 Parkway, London", password: "123456", skater_level: "Intermediate"}
fourth_user_hash = { first_name: "Nana", email: "test3@test.test", address: "111 Bellenden Rd, London", password: "123456", skater_level: "Beginner"}

first_user_image = URI.open("https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1116&q=80")
second_user_image = URI.open("https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")
third_user_image = URI.open("https://images.unsplash.com/photo-1618077360395-f3068be8e001?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880")
fourth_user_image = URI.open("https://images.unsplash.com/photo-1547212371-eb5e6a4b590c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880")

user_one = User.new(first_user_hash)
user_one.photo.attach(io: first_user_image, filename: 'user1.png', content_type: 'image/png')
user_one.save!
sleep(1)
user_two = User.new(second_user_hash)
user_two.photo.attach(io: second_user_image, filename: 'user2.png', content_type: 'image/png')
user_two.save!
sleep(1)
user_three = User.new(third_user_hash)
user_three.photo.attach(io: third_user_image, filename: 'user3.png', content_type: 'image/png')
user_three.save!
sleep(1)
user_four = User.new(fourth_user_hash)
user_four.photo.attach(io: fourth_user_image, filename: 'user4.png', content_type: 'image/png')
user_four.save!

coach_one = Coach.new
coach_one.user = User.last
coach_one.bio = "I am an elite skater born and bred in London. I was at the 2012 Olympics and have participated in multiple international Skating competitions. I am looking for motivated students to work with. If you book me you are bound to be a PRO in no time!"
coach_one.style = "aggressive"
coach_one.save!

coach_two = Coach.new
coach_two.user = User.find((User.last.id - 1))
coach_two.bio = "Skating is my passion. I skate to the shop, skate to my doctors appointments, skate in the tube... I live to skate! If you are a passionate skater and want to improve your freestyle skills, I am the coach for you!"
coach_two.style = "freestyle"
coach_two.save!

users = [user_one, user_two, user_three, user_four]

10.times do
  attributes = {}
  attributes[:title] = titles[0]
  attributes[:description] = descriptions[0]

  # setting address
  attributes[:address] = addresses[0]


  location = Location.new(attributes)
  location.user = users.sample

  # attaching photo to plant
  file = URI.open(images[0])
  location.photos.attach(io: file, filename: 'location.png', content_type: 'image/png')
  location.save!

  titles.delete_at(0)
  descriptions.delete_at(0)
  addresses.delete_at(0)
  images.delete_at(0)
end

Location.all.each do |location|
  location.photos.attach(io: File.open("app/assets/images/stock_location#{arr.sample}.jpg"), filename: "stock_location#{arr.sample}.jpg", content_type: 'image/jpg')
  location.save!
end

# manual fix to locations that did not get correct long/lat
location = Location.find_by(title: "Acton Skatepark")
location.address = "W3 7LB"
location.save

location = Location.find_by(title: "Barking Better Extreme Skatepark")
location.address = "RM8 2JR"
location.save

location = Location.find_by(title: "Barking Skatpark")
location.address = "IG11 8SL"
location.save

location = Location.find_by(title: "Beddington Mini-Ramp")
location.address = "SM6 7NN"
location.save

location = Location.find_by(title: "Bedfont Skatepark")
location.address = "TW14 8JA"
location.save

puts "Done! #{Location.count} locations, #{User.count} users and #{Coach.count} coaches created!"
