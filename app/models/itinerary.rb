class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :list_items
  has_many :locations, through: :list_items

  def coords
    coord_arr = locations.map do |location|
      if location.longitude.nil? || location.latitude.nil?
        location.latitude = 51.51183314085651
        location.longitude = -0.21878659646091592
      end
      [location.longitude, location.latitude]
    end
    return coord_arr
  end
end
