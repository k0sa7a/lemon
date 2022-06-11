class ApplicationController < ActionController::Base
  include WeatherHelper
  before_action :authenticate_user!

  def default_url_options
    { host: ENV["DOMAIN"] || "localhost:3000" }
  end
end
