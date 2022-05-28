class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :destroy, :edit, :update]
  def index
    @locations = Location.all

    @markers = @locations.geocoded.map do |location|
      {
        lat: location.latitude,
        lng: location.longitude,
        info_window: render_to_string(partial: "info_window", locals: { location: location }),
        image_url: helpers.asset_url("wheel_icon.webp")
      }
    end
  end

  def show
  end

  def new
    @location = Location.new
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
  end

  def update
    @location.update(location_params)
    redirect_to location_path(@location)
  end

  def destroy
    @location.destroy
    redirect_to locations_path
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
