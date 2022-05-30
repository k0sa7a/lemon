module WeatherHelper
  def check_weather
    api_url = "https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=#{ENV['OPEN_WEATHER_API_KEY']}"
    JSON.parse(URI.open(api_url).read)
  end
end
