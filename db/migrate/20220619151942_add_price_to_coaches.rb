class AddPriceToCoaches < ActiveRecord::Migration[6.1]
  def change
    add_monetize :coaches, :price, currency: { present: false }
  end
end
