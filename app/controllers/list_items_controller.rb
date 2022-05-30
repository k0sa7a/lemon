class ListItemsController < ApplicationController

  def create
    @list_item = ListItem.new(list_item_params)
    @list_item.location_id = params[:location_id].to_i
    # raise
    if @list_item.save
    else
      puts @list_item.errors.full_messages
      puts "something goes wrong"
    end
    redirect_to locations_path
  end

  private

  def list_item_params
    params.require(:list_item).permit(
      :location_id,
      :itinerary_id
    )
  end
end
