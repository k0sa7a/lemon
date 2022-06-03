class ListItemsController < ApplicationController
  before_action :set_list_item, only: [:destroy]
  def create
    @list_item = ListItem.new(list_item_params)
    @list_item.location = Location.find(params[:location_id])
    # raise
    if @list_item.save
    else
      puts @list_item.errors.full_messages
      puts "something went wrong"
    end
    redirect_to locations_path
  end

  def destroy
    @list_item.destroy
    itinerary = @list_item.itinerary
    @items = itinerary.list_items
    respond_to do |format|
      format.html { redirect_to itinerary_path(@list_item.itinerary), notice: 'Location was removed.' }
      format.js
    end
  end

  private

  def set_list_item
    @list_item = ListItem.find(params[:id])
  end

  def list_item_params
    params.require(:list_item).permit(
      :itinerary_id
    )
  end
end
