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

    respond_to do |format|
      format.html
      format.text {render partial: 'shared/coaches_list',
                          locals: {coaches: @coaches},
                          formats: [:html] }
    end

  end
end
