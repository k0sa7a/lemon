class CreateCoaches < ActiveRecord::Migration[6.1]
  def change
    create_table :coaches do |t|
      t.references :user, null: false, foreign_key: true
      t.text :bio
      t.string :style

      t.timestamps
    end
  end
end
