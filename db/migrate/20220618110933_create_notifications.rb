class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.text :content
      t.boolean :viewed, default: false
      t.references :user, null: false, foreign_key: true
      t.references :appointment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
