module WeatherHelper
  require 'open-uri'
  def check_weather(lat, lon)
    api_url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&units=metric&appid=#{ENV['OPEN_WEATHER_API_KEY']}"
    JSON.parse(URI.open(api_url).read)
  end

  def return_weather(result)
    @weather_icon = "http://openweathermap.org/img/wn/#{result['weather'][0]['icon']}.png"
  end

  def return_temperature(result)
    @temp = result['main']['temp'].round(1)
  end

  def return_wind(result)
    @wind = result['wind']['speed'].round(1)
  end
end
