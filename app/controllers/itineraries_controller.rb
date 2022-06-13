class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: [:show, :destroy, :edit, :update]

  def show
    @markers = @itinerary.locations.geocoded.map do |location|
      {
        lat: location.latitude,
        lng: location.longitude,
        info_window: render_to_string(partial: "shared/info_window", locals: { location: location }),
        image_url: helpers.asset_url("wheel_icon.webp")
      }
    end
  end

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.user = current_user
    # @itinerary.save!
    @itinerary.save
    respond_to do |format|
      format.json
    end

    # redirect_to locations_path


    #     format.html { render "locations" }
    #     # puts @itinerary.errors.full_messages
    #     # puts "something went wrong"
    #   end
    # redirect_to locations_path/
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
