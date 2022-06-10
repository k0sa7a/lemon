class ListItemsController < ApplicationController
  before_action :set_list_item, only: [:destroy, :update]
  def create
    @list_item = ListItem.new(list_item_params)

    @list_item.location = Location.find(params[:location_id])
    # raise
    @list_item.start = true unless get_starting_point(@list_item.itinerary)

    if @list_item.save
    else
      puts @list_item.errors.full_messages
      puts "something went wrong"
    end
    redirect_to locations_path
  end

  def destroy
    @itinerary = @list_item.itinerary
    @list_item.destroy
    # if @list_item.start
    #   if @itinerary.list_items.empty?
    #     p 'none left'
    #   elsif @itinerary.list_items.first == @list_item
    #     @itinerary.list_items[1].update(start: true)
    #   else
    #     @itinerary.list_items.first.update(start: true)
    #   end
    # end
    # @items = @itinerary.list_items
    respond_to do |format|
      # format.html { redirect_to itinerary_path(@list_item.itinerary), notice: 'Location was removed.' } - enable if using button_to instead of link_to
      format.json { head :ok }
    end
  end

  def update
    @itinerary = @list_item.itinerary
    previous_start = ListItem.where(itinerary: @itinerary, start: true).first
    previous_start.update(start: false) unless previous_start.nil?

    @list_item.update!(list_item_params)
    render partial: "shared/list_item", locals: {item: @list_item}
    # respond_to do |format|
    #   format.html { redirect_to itinerary_path(@itinerary) }
    #   format.text { render partial: "movies/movie_infos", locals: { movie: @movie }, formats: [:html] }
    # end
  end

  private

  def get_starting_point(itinerary)
    return false if itinerary.list_items.empty?

    itinerary.list_items.each do |item|
      return true if item.start
    end
    return false
  end

  def set_list_item
    @list_item = ListItem.find(params[:id])
  end

  def list_item_params
    params.require(:list_item).permit(
      :itinerary_id, :start, :location_id
    )
  end
end
