class CoachesController < ApplicationController
  before_action :set_itinerary, only: [:show, :edit, :update]
  def new
  end

  def create
  end

  def show
    @appointment = Appointment.new
  end

  def index
    if params[:query].present?
      @coaches = Coach.search_by_style_and_bio(params[:query])
    else
      @coaches = Coach.all
    end

    respond_to do |format|
      format.html
      format.text {render partial: 'shared/coaches_list',
                          locals: {coaches: @coaches},
                          formats: [:html] }
    end

  end

  def edit
  end

  def update
  end

  private

  def set_coach
    @coach = Coach.find(params[:id])
  end
end
