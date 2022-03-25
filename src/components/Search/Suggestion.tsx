import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { SuggestionItem } from './styled';

interface ISuggestionProps {
  label: string;
  lat: number,
  lng: number
  hideSuggestionFn: Function;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(fetchWeather({
      lat: props.lat,
      lng: props.lng,
    }));
    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);
  };

  return <SuggestionItem onClick={onClick}>{props.label}</SuggestionItem>;
};

export default Suggestion;
