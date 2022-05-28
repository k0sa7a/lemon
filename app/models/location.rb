class Location < ApplicationRecord
  belongs_to :user
  has_many_attached :photos
  has_many :list_items
end
