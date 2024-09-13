import { useState } from 'react';
import './App.css';
import WeatherDetailed from './components/WeatherDetailed';
import WeatherOverview from './components/WeatherOverview';
import Cities from './constants/Cities';
import WeatherContext from './contexts/WeatherContext';
import { WeatherContextType } from './types/WeatherContextType';



function App() {
  const [weatherState, setWeatherState] = useState({currentCity: 'Toronto', forecastTab: false} as WeatherContextType);


  const cities: string[] = Object.keys(Cities);

  const setCurrentCity = (city: string) => {
    const newState: WeatherContextType = Object.assign({}, weatherState);
    newState.currentCity = city;
    setWeatherState(newState);
  }


  return (
    <WeatherContext.Provider value={weatherState}> 
      <div className="weather-overview-selection">
        <div className='app-name'>
          <h1>Weather</h1>
        </div>
        <select className="select-city" value={weatherState.currentCity} onChange={e => setCurrentCity(e.target.value)}>
          {
            cities.map((value) => {
              return (<option key={value} value={value}>{value}</option>)
            })
          }
        </select>
        <WeatherOverview></WeatherOverview>
      </div>
        
      <div className='weather-detailed'>
        <button className='forecast-button' onClick={e => setWeatherState({...weatherState, forecastTab: !weatherState.forecastTab})}>
          { weatherState.forecastTab ? 'Close Forecast' : 'See Forecast' }
        </button>
        { weatherState.forecastTab &&  <WeatherDetailed></WeatherDetailed> }
      </div>

    </WeatherContext.Provider>
  );

}

export default App
