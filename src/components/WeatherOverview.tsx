import { useContext, useEffect, useState } from "react";
import Cities from "../constants/Cities";
import WeatherContext from "../contexts/WeatherContext";
import WeatherApi from "../services/WeatherApi";
import { WeatherContextType } from "../types/WeatherContextType";
import WeatherIcon from "./WeatherIcon";
import { convertToCelsius } from "../utils/utils";


function WeatherOverview() {
    const context: WeatherContextType = useContext(WeatherContext);
    const [weather, setWeather] = useState({} as any);

    useEffect(() => {
        WeatherApi.getWeather(Cities[context.currentCity]).then((response) => {
            setWeather(response);
        }).catch((reason) => {
            //Would trigger the 'Could not retrieve'
            setWeather({});
        });
    }, [context.currentCity])

    return ( 
        <div className="weather-description-container">
            {       
                weather.weather?.length > 0 ?
                        <div className="weather-description">
                            <WeatherIcon icon={(weather.weather[0].main).toLowerCase()}></WeatherIcon>
                            <p>{weather.weather[0].main}</p>
                            <p>{weather.weather[0]?.description}</p>
                            <p>{convertToCelsius(weather.main.temp, 0)} &deg;C </p>
                        </div>
                    :
                        <p> Could not retrieve weather</p>
            }
            {
                weather.wind?.speed && <p className="wind-speed">Wind: {weather.wind?.speed} m/s</p>
            }
        </div>
    );
}

export default WeatherOverview;