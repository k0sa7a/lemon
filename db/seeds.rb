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
fifth_user_hash = { first_name: "Greg", email: "test4@test.test", address: "852 Park Road, London", password: "123456", skater_level: "Expert"}
sixt_user_hash = { first_name: "Roxana", email: "test5@test.test", address: "600 George Street, London", password: "123456", skater_level: "Intermediate"}
seventh_user_hash = { first_name: "Barny", email: "test6@test.test", address: "66 Chester Road, London", password: "123456", skater_level: "Expert"}
eighth_user_hash = { first_name: "Lizzie", email: "test7@test.test", address: "1 North Street, London", password: "123456", skater_level: "Intermediate"}
ninth_user_hash = { first_name: "Alistair", email: "test8@test.test", address: "9801 Broadway, London", password: "123456", skater_level: "Expert"}
tenth_user_hash = { first_name: "Homer", email: "test9@test.test", address: "356 The Drive, London", password: "123456", skater_level: "Beginner"}

first_user_image = URI.open("https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1116&q=80")
second_user_image = URI.open("https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")
third_user_image = URI.open("https://images.unsplash.com/photo-1618077360395-f3068be8e001?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880")
fourth_user_image = URI.open("https://images.unsplash.com/photo-1547212371-eb5e6a4b590c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880")
fifth_user_image = URI.open("https://images.unsplash.com/photo-1485893226355-9a1c32a0c81e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")
sixt_user_image = URI.open("https://images.unsplash.com/photo-1629378962667-aecffa490225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80")
seventh_user_image = URI.open("https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1234&q=80")
eighth_user_image = URI.open("https://images.unsplash.com/photo-1617200785733-6237c87c9ece?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")
ninth_user_image = URI.open("https://images.unsplash.com/photo-1626981065755-d0939b5baa76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")
tenth_user_image = URI.open("https://images.unsplash.com/photo-1592790807458-d7980c141d90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80")

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
sleep(1)
user_five = User.new(fifth_user_hash)
user_five.photo.attach(io: fifth_user_image, filename: 'user5.png', content_type: 'image/png')
user_five.save!
sleep(1)
user_six = User.new(sixt_user_hash)
user_six.photo.attach(io: sixt_user_image, filename: 'user6.png', content_type: 'image/png')
user_six.save!
sleep(1)
user_seven = User.new(seventh_user_hash)
user_seven.photo.attach(io: seventh_user_image, filename: 'user7.png', content_type: 'image/png')
user_seven.save!
sleep(1)
user_eight = User.new(eighth_user_hash)
user_eight.photo.attach(io: eighth_user_image, filename: 'user8.png', content_type: 'image/png')
user_eight.save!
sleep(1)
user_nine = User.new(ninth_user_hash)
user_nine.photo.attach(io: ninth_user_image, filename: 'user9.png', content_type: 'image/png')
user_nine.save!
sleep(1)
user_ten = User.new(tenth_user_hash)
user_ten.photo.attach(io: tenth_user_image, filename: 'user10.png', content_type: 'image/png')
user_ten.save!

coach_one = Coach.new
coach_one.user = User.last
coach_one.bio = "To be honest I am a complete beginner, but I really need the money, so wanted to try coaching. I can't really show you a lot of skating tricks, but I am great at giving orders, so I feel you can learn a lot by booking a session with me! PLEASE..."
coach_one.style = "recreational"
coach_one.price = 20
coach_one.save!

coach_two = Coach.new
coach_two.user = User.find((User.last.id - 1))
coach_two.bio = "Skating is my passion. I skate to the shop, skate to my doctors appointments, skate in the tube... I live to skate! If you are a passionate skater and want to improve your freestyle skills, I am the coach for you!"
coach_two.style = "freestyle"
coach_two.price = 35
coach_two.save!

coach_three = Coach.new
coach_three.user = User.find((User.last.id - 2))
coach_three.bio = "I am an elite skater born and bred in London. I was at the 2012 Olympics and have participated in multiple international Skating competitions. I am looking for motivated students to work with. If you book me you are bound to be a PRO in no time!"
coach_three.style = "aggressive"
coach_three.price = 40
coach_three.save!

coach_four = Coach.new
coach_four.user = User.find((User.last.id - 3))
coach_four.bio = "I started skating 5 years ago and since then have been a regular at most of London's skateparks. I broke my leg 6 months ago, so had to take some time off, but am back now. Hope to get some great students this summer."
coach_four.style = "aggressive"
coach_four.price = 32
coach_four.save!

coach_five = Coach.new
coach_five.user = User.find((User.last.id - 4))
coach_five.bio = "Tricks and skate-parks are not my thing, but if you are looking to learn how to skate at 80 mph down a hill without breaking your neck book me for a coaching session."
coach_five.style = "speed"
coach_five.price = 43
coach_five.save!

coach_six = Coach.new
coach_six.user = User.find((User.last.id - 5))
coach_six.bio = "I am an investment banker by day and skater-nut by night. I can't do coaching sessions before 9PM, but if you want to try out some night-skating, I would love to teach you a thing or two."
coach_six.style = "freestyle"
coach_six.price = 50
coach_six.save!

coach_seven = Coach.new
coach_seven.user = User.find((User.last.id - 6))
coach_seven.bio = "I used to skate a lot when I was younger and just recently rediscovered my interest for the sport. I can show you some oldschool moves that kids used to go crazy about back in my day."
coach_seven.style = "aggressive"
coach_seven.price = 25
coach_seven.save!


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

# manual locations in central London for demo
location1 = Location.new(title: "Hyde Park South skate spot", description: "When it is not too crowded, this is a perfect spot to try out some tricks and socialize. Avoid on weekends, as it is full of tourists", address: "W2 2UH")
location1.user = User.find(rand((User.first.id)..(User.last.id)))
file = URI.open("https://images.unsplash.com/photo-1623246112598-ce2f39818003?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80")
location1.photos.attach(io: file, filename: 'location.png', content_type: 'image/png')
location1.save!

location2 = Location.new(title: "Green Park", description: "One of the less busy skate spots. Great for testing your max speed. Always some friendly skaters around that can help with tips and suggestions.", address: "SW1A 1BW")
location2.user = User.find(rand((User.first.id)..(User.last.id)))
file = URI.open("https://images.unsplash.com/photo-1483633118203-e785579ec4a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80")
location2.photos.attach(io: file, filename: 'location.png', content_type: 'image/png')
location2.save!

location3 = Location.new(title: "Mayfair/Berkeley square", description: "Cool spot to try out your grinds! A lot of rails and obstacles. One problem is that security comes every now and then and kicks everyone out.", address: "W1J 6HE")
location3.user = User.find(rand((User.first.id)..(User.last.id)))
file = URI.open("https://images.unsplash.com/photo-1520190319646-36e4469ed921?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80")
location3.photos.attach(io: file, filename: 'location.png', content_type: 'image/png')
location3.save!

puts "Done! #{Location.count} locations, #{User.count} users and #{Coach.count} coaches created!"
