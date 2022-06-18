class User < ApplicationRecord
  acts_as_favoritor
  has_one :coach
  has_many :locations
  has_many :itineraries
  has_one_attached :photo
  has_many :meetings
  has_many :events
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
