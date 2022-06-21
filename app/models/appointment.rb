class Appointment < ApplicationRecord
  belongs_to :coach
  belongs_to :user
  monetize :amount_cents
end
