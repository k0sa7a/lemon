class UsersController < ApplicationController
  def show
    @user = User.new
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
    params.require(:user).permit(:email, :first_name, :photo, :address)
  end

  def my_listings
    @listings = Plant.where(user_id: current_user)
  end

  def other_user_listings
    @listings = Plant.where(user_id: params[:id])
  end

  def my_sales
    all_sales = Purchase.all
    sales = []
    all_sales.each do |purchase|
      if purchase.plant.user_id == current_user.id
        sales << purchase
      end
    end
    return sales
  end

end
