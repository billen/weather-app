import axios, { Axios } from 'axios';
import { City } from '../constants/Cities';


const appId : string = "538882fc8387290c6cee83f313a6acf5";
const axiosInstance : Axios = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    } 
});

function WeatherApi() {
    async function getWeather(city: City) {
        return await axiosInstance.get("weather", {params: {
            id: city.id.toString(),
            appid: appId
        }}).then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
    }

    async function getForecast(city: City) {
        return await axiosInstance.get("forecast", {params: {
            id: city.id.toString(),
            appid: appId
        }}).then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }

    return {
        getWeather,
        getForecast
    }
}

export default WeatherApi();