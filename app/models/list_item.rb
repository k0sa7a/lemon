class ListItem < ApplicationRecord
  belongs_to :itinerary
  belongs_to :location
end
