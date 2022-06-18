class Coach < ApplicationRecord
  belongs_to :user
  has_many :appointments

  include PgSearch::Model
  pg_search_scope :search_by_style_and_bio, against: {
    style: 'A', bio: 'B'
  }, using: {
    tsearch: {
      prefix: true
    }
  }
end