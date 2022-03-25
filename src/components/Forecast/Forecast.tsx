import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import ForecastItem from './ForecastItem';
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';

const Forecast: React.FC = () => {
  const { forecast, isInitial, hourlyForecast } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
    hourlyForecast: state.weather.hourlyForcastData
  }));

  if (isInitial) return <></>;

  return (
    <ForecastContainer>
      <SectionTitle>Hourly Forecast</SectionTitle>
      <ForecastItems>
        {hourlyForecast.map((item, i) => {
          return (
            <ForecastItem
              key={i}
              time={item.hour}
              temp={item.main.temp}
              weatherCode={item.weather.id}
              main={item.weather.main}
            />
          );
        })}
      </ForecastItems>
      <SectionTitle>Extended Forecast</SectionTitle>
      <ForecastItems>
        {forecast.map((item, i) => {
          return (
            <ForecastItem
              key={i}
              day={item.day}
              high={item.temp.temp_max}
              low={item.temp.temp_min}
              morn={item.temp.morn}
              after={item.temp.day}
              eve={item.temp.eve}
              night={item.temp.night}
              weatherCode={item.weather.id}
              main={item.weather.main}
            />
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;
