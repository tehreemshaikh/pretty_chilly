import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, HourlyData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays, timeStampToDate } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lng: number }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(setIsLoading(true));

    try {
      const res = await Promise.all([fetchWeatherData(city), fetchExtendedForecastData(city)]);
      dispatch(setIsLoading(false));
      if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        return res;
      }
      return rejectWithValue(res[0].message);
    } catch {
      dispatch(setIsLoading(false));
      return rejectWithValue('Error');
    }
  }
);

export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
  hourly: HourlyData[]
} => {
  const weather = res[0] as WeatherData;
  const forecast: ExtendedForecastData[] = [];
  const hourly: HourlyData[] = [];
  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  res[1].daily.forEach((i: any, index: number) => {
    if(index < res[1].daily.length - 1){
      forecast.push({
        day: next7Days[index],
        temp: {
          temp_max: kelvinToCelcius(i.temp.max),
          temp_min: kelvinToCelcius(i.temp.min),
          morn: kelvinToCelcius(i.temp.morn),
          day: kelvinToCelcius(i.temp.day),
          eve: kelvinToCelcius(i.temp.eve),
          night: kelvinToCelcius(i.temp.night)
        },
        weather: {
          id: i.weather[0].id,
          main: i.weather[0].main,
        },
      });
    }
  });
  for(let idx = 0; idx < 24; idx++){
    let i = res[1].hourly[idx];
    let dateTimeStr = timeStampToDate(i.dt);
      hourly.push({
        date: dateTimeStr.dateStr,
        hour: dateTimeStr.timeStr,
        main: {
          temp: kelvinToCelcius(i.temp),
          feels_like: kelvinToCelcius(i.feels_like),
          pressure: i.pressure,
          humidity: i.humidity,
        },
        weather: {...i.weather[0]},
        wind:{
          speed: i.wind_speed,
          deg: i.wind_deg
        }
      });
  }
  return {
    weather,
    forecast,
    hourly
  };
};
