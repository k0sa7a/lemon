class CoachesController < ApplicationController
  def new
    @coach = Coach.new
  end

  def create
    @coach = Coach.new(coach_params)
    @coach.user = current_user
    if @coach.save
      flash[:notice] = "You have registered as a coach"
      redirect_to coach_path(@coach)
    else
      flash.now[:alert] = "Sorry there was an issue"
      render :new
    end
  end

  def show
    @coach = Coach.find(params[:id])
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

  def coach_params
    params.require(:coach).permit(
      :bio,
      :style,
      :price
    )
  end
end
