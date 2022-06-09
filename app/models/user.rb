class User < ApplicationRecord
  acts_as_favoritor
  has_many :locations
  has_many :itineraries
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
