class CreatePrivatechats < ActiveRecord::Migration[6.1]
  def change
    create_table :privatechats do |t|
      t.references :user, null: false, foreign_key: true
      t.references :chatroom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
