class AddSkaterLevelToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :skater_level, :string
  end
end
