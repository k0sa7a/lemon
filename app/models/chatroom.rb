class Chatroom < ApplicationRecord
  has_many :messages
  has_one :meeting
end
