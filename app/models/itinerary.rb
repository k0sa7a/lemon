class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :list_items
  has_many :locations, through: :list_items
end
