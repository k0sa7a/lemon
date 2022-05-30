class ChangeDefaultForItinerariesPrivacy < ActiveRecord::Migration[6.1]
  def change
    change_column :itineraries, :privacy, :boolean, default: 0
  end
end
