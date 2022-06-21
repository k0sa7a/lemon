class AddCoachToPrivatechat < ActiveRecord::Migration[6.1]
  def change
    add_reference :privatechats, :coach, null: false, foreign_key: true
  end
end
