class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @user_page = true
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_path(@user)
  end

  def index
    # Scope your query to the dates being shown:
    start_date = params.fetch(:start_date, Date.today).to_date
    # For a monthly view:
    @meetings = Meeting.where(starts_at: start_date.beginning_of_month.beginning_of_week..start_date.end_of_month.end_of_week)
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :photo, :address, :skater_level, :about)
  end
end
