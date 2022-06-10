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

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :photo, :address, :skater_level, :about)
  end
end
