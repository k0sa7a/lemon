class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :destroy, :edit, :update]

  def index
    if params[:query].present?
      distance = params[:distance].present? ? params[:distance] : 1
      @locations = Location.near(params[:query], distance)

      query_loc = Geocoder.search(params[:query]).first
      coord = query_loc.nil? ? [51.5085, -0.1257] : query_loc.coordinates
      result = check_weather(coord[0], coord[1])
      return_weather(result)
      return_temperature(result)
      return_wind(result)
    else
      @locations = Location.all
    end
    @markers = @locations.geocoded.map do |location|
      {
        lat: location.latitude,
        lng: location.longitude,
        info_window: render_to_string(partial: "shared/info_window", locals: { location: location }),
        image_url: helpers.asset_url("wheel_icon.webp")
      }
    end
    @list_item = ListItem.new
    @itinerary = Itinerary.new
  end

  def show
  end

  def new
    @location = Location.new
    @location_page = true
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      redirect_to location_path(@location)
    else
      render :new
    end
  end

  def edit
    @location_page = true
  end

  def update
    @location.update(location_params)
    redirect_to location_path(@location)
  end

  def destroy
    @location.destroy
    redirect_to locations_path
  end

  def toggle_favorite
    @location = Location.find_by(id: params[:id])
    current_user.favorited?(@location) ? current_user.unfavorite(@location) : current_user.favorite(@location)
  end

  private

  def location_params
    params.require(:location).permit(
      :title,
      :description,
      :address,
      photos: []
    )
  end

  def set_location
    @location = Location.find(params[:id])
  end
end
