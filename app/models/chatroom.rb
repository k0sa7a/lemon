class Chatroom < ApplicationRecord
  has_many :messages
  has_one :event
  has_many :users, through: :privatechats
end
