import { createContext } from "react";
import { WeatherContextType } from "../types/WeatherContextType";

const WeatherContext = createContext({currentCity: 'Toronto'} as WeatherContextType);

export default WeatherContext;