class Event < ApplicationRecord
  belongs_to :itinerary
  belongs_to :chatroom
  belongs_to :user
  belongs_to :meeting
end
