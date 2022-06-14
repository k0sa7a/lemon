class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.references :itinerary, null: false, foreign_key: true
      t.references :chatroom, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :meeting, null: false, foreign_key: true

      t.timestamps
    end
  end
end
