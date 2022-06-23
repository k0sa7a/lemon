class User < ApplicationRecord
  acts_as_favoritor
  has_one :coach
  has_many :locations
  has_many :itineraries
  has_one_attached :photo
  has_many :meetings
  has_many :events
  has_many :appointments
  has_many :privatechats
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  def chat_rooms
    if coach.nil?
      private_chats = Privatechat.where(user_id: id)
    else
      private_chats = Privatechat.where(user_id: id).or(Privatechat.where(coach_id: coach.id))
    end
    chatrooms = private_chats.map do |chat|
      Chatroom.find(chat.chatroom_id)
    end
    return chatrooms
  end
end
