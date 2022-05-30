module WeatherHelper
  require 'open-uri'
  def check_weather
    api_url = "https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=#{ENV['OPEN_WEATHER_API_KEY']}"
    JSON.parse(URI.open(api_url).read)
  end

  def return_weather
    result = check_weather
    @weather_icon = "http://openweathermap.org/img/wn/#{result['weather'][0]['icon']}.png"
  end

  def return_temperature
    result = check_weather
    @temp = result['main']['temp'].round(1)
  end
end
