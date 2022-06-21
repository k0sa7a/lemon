class AddColumnsToMeeting < ActiveRecord::Migration[6.1]
  def change
    add_reference :meetings, :itinerary, foreign_key: true
    add_reference :meetings, :chatroom, foreign_key: true
  end
end
