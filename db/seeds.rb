# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require'nokogiri'

puts "Clearing Database..."

# Location.destroy_all
# User.destroy_all

puts "Creating a new database..."

url = "https://www.skateparks.co.uk/london/"
html_file = URI.open(url).read
html_doc = Nokogiri::HTML(html_file)

descriptions = []
html_doc.search('.excerpt p').each do |element|
  descriptions << element.text.strip.gsub(' […]', '...')
end



titles = []
html_doc.search('.info h3').each do |element|
  titles << element.text.strip
end



images = []
html_doc.search('.image img').each do |element|
  if element.attr('src') == "https://www.skateparks.co.uk/wp-content/themes/FoundationSkate/assets/img/placeholder.png"
    image_url = '../app/assets/images/'
  else
  image_url = element.attr('src')
  # image_url.slice!("360_50_")
  images << image_url
end

# p images.first

# https://www.skateparks.co.uk/wp-content/uploads/2018/11/Acton-Skatepark-1-568x320.jpeg
