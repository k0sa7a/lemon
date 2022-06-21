class Chatroom < ApplicationRecord
  has_many :messages
  has_one :event
  belongs_to :meeting
end
