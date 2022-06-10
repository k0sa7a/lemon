class AddStartToListItems < ActiveRecord::Migration[6.1]
  def change
    add_column :list_items, :start, :boolean, default: false
  end
end
