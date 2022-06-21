class AddStripedetailsToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_monetize :appointments, :amount, currency: { present: false }
    add_column :appointments, :state, :string
    add_column :appointments, :checkout_session_id, :string
  end
end
