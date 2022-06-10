class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def index
    start_date = params.fetch(:start_date, Date.today).to_date
    @meetings = Meeting.where(starts_at: start_date.beginning_of_month.beginning_of_week..start_date.end_of_month.end_of_week)
  end
end
