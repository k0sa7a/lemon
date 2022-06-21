class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @user_page = true
    @fav_locations = current_user.all_favorited
    start_date = params.fetch(:start_date, Date.today).to_date
    @meetings = Meeting.where(start_time: start_date.beginning_of_month.beginning_of_week..start_date.end_of_month.end_of_week)
    #@meeting = Meeting.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_path(@user)
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :photo, :address, :skater_level, :about)
  end
end
