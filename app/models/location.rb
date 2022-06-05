class Location < ApplicationRecord
  belongs_to :user
  has_many_attached :photos
  has_many :list_items
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  def coords
    if longitude.nil? || latitude.nil?
      self.latitude = 51.51183314085651
      self.longitude = -0.21878659646091592
    end
    [longitude, latitude]
  end
end
