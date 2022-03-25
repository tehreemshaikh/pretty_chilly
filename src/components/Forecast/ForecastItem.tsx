import React from 'react';
import { InfoRow } from '../CurrentWeather/styled';
import Temperature from '../CurrentWeather/Temperature';
import WeatherIcon from '../CurrentWeather/WeatherIcon';
import { ForecastItemContainer } from './styled';

interface IForecastItemProps {
  day?: string;
  date?: string;
  time?: string;
  weatherCode: number;
  temp?: number;
  high?: number;
  low?: number;
  main: string;
  morn?: number;
  after?: number;
  eve?: number;
  night?: number
}
const ForecastItem: React.FC<IForecastItemProps> = (props) => {
  return (
    <ForecastItemContainer style={{marginInline: props.time? '30px': '0px'}}>
      {props.day && <h6>{props.day}</h6>}
      {props.date && <h6>{props.date}</h6>}
      {props.time && <h6>{props.time}</h6>}
      <WeatherIcon code={props.weatherCode} />
      <p>{props.main}</p>
      {props.high && props.low && <span>
        <Temperature value={props.high} />
        <sup>&deg;</sup>
        <small>/</small>
        <Temperature value={props.low} />
        <sup>&deg;</sup>
      </span>}
      {props.temp && <span>
        <Temperature value={props.temp} />
        <sup>&deg;</sup>
      </span>}
      <br></br>
      {props.morn && <InfoRow>
          <div>
          Morning
          </div>
          <span>{props.morn}<sup>&deg;</sup></span>
      </InfoRow>}
      {props.after && <InfoRow>
          <div>
          Afternoon
          </div>
          <span>{props.after}<sup>&deg;</sup></span>
      </InfoRow>}
      {props.eve && <InfoRow>
          <div>
          Evening
          </div>
          <span>{props.eve}<sup>&deg;</sup></span>
      </InfoRow>}
      {props.night && <InfoRow>
          <div>
          Night
          </div>
          <span>{props.night}<sup>&deg;</sup></span>
      </InfoRow>}
    </ForecastItemContainer>
  );
};

export default ForecastItem;
