class CreateItineraries < ActiveRecord::Migration[6.1]
  def change
    create_table :itineraries do |t|
      t.boolean :privacy
      t.string :title
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
