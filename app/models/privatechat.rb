class Privatechat < ApplicationRecord
  belongs_to :user
  belongs_to :coach
  belongs_to :chatroom
end
