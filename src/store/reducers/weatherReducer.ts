import { createSlice } from '@reduxjs/toolkit';
import { ExtendedForecastData, HourlyData, WeatherData } from '../../api/types';
import { fetchWeather, transformWeatherData } from '../fetchWeather';

export type WeatherState = {
  weatherData: WeatherData; // Current Weather
  extendedWeatherData: ExtendedForecastData[]; // Next seven days
  hourlyForcastData: HourlyData[], // Next 24 hours
  isError: boolean;
}

const initialState: WeatherState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '', //Borivali
    sys: {
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: '',
      description: '', // Clear, Smoky
      icon: '', 
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  extendedWeatherData: [],
  hourlyForcastData: [],
  isError: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => { // fetchWeather => call API
        const res = transformWeatherData(action.payload); // Transforms API Data
        state.weatherData = res.weather;
        state.extendedWeatherData = res.forecast;
        state.hourlyForcastData = res.hourly
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default weatherSlice.reducer;
