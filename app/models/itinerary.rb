class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :list_items
  has_many :locations, through: :list_items

  def coords
    coord_arr = locations.map do |location|
      if location.longitude.nil? || location.latitude.nil?
        location.latitude = 51.5942234
        location.longitude = -0.1308851122175931
      end
      [location.longitude, location.latitude]
    end
    return coord_arr
  end
end
