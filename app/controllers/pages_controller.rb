class PagesController < ApplicationController
  require 'open-uri'
  include WeatherHelper

  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    result = check_weather
    @weather_icon = "http://openweathermap.org/img/wn/#{result['weather'][0]['icon']}.png"
    @temp = result['main']['temp'].round(1)
  end
end
