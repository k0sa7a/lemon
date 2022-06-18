class CoachesController < ApplicationController
  def new
  end

  def create
  end

  def index
    @coaches = Coach.all
  end
end
