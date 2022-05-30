class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: [:show, :destroy, :edit, :update]

  def show
  end

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.user = current_user
    if @itinerary.save
    else
      puts @itinerary.errors.full_messages
      puts "something went wrong"
    end
    redirect_to locations_path
  end

  private

  def itinerary_params
    params.require(:itinerary).permit(
      :title
    )
  end

  def set_itinerary
    @itinerary = Itinerary.find(params[:id])
  end
end
