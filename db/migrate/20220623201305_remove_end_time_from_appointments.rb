class RemoveEndTimeFromAppointments < ActiveRecord::Migration[6.1]
  def change
    remove_column :appointments, :end_time, :datatime
  end
end
