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
    @coaches = Coach.all
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
