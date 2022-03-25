const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  //https://api.openweathermap.org/data/2.5/weather?lat=19.1823872&lon=72.8465408&appid=73a907b6829e3d5407a7b200bf05b47e
  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  }
  return await (await fetch(url)).json();
};

export const fetchExtendedForecastData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/onecall?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  //https://api.openweathermap.org/data/2.5/onecall?lat=19.1823872&lon=72.8465408&exclude=minutely,current&appid=73a907b6829e3d5407a7b200bf05b47e
  if(typeof city === 'object'){
    url = `${baseUrl}/onecall?lat=${city.lat}&lon=${city.lng}&exclude=minutely,current&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  }

  return await (await fetch(url)).json();
};
