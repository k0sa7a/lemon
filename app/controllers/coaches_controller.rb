class CoachesController < ApplicationController
  def new
  end

  def create
  end

  def index
    if params[:query].present?
      @coaches = Coach.search_by_style_and_bio(params[:query])
    else
      @coaches = Coach.all
    end
  end
end
