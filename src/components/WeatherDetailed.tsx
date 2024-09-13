import { format, isBefore } from "date-fns";
import * as _ from 'lodash';
import { useContext, useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Cities from "../constants/Cities";
import WeatherContext from "../contexts/WeatherContext";
import WeatherApi from "../services/WeatherApi";
import { WeatherContextType } from "../types/WeatherContextType";
import { convertToCelsius } from "../utils/utils";

function WeatherDetailed() {
    const context : WeatherContextType = useContext(WeatherContext);
    const [forecast, setForecast] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [dates, setDates] = useState<string[]>([]);
    const [forecastSeperatedByDates, setForecastSeperatedByDates] = useState<_.Dictionary<any>>([]);

    useEffect(() => {
        setLoading(true);
        WeatherApi.getForecast(Cities[context.currentCity]).then((response) => {
            setForecast(response);
            extractDates(response.list);
            setLoading(false);
        }).catch((reason) => {
            setLoading(false);
        })
    }, [context.currentCity])


 
    const extractDates = (data: []) => {
        //Assumed it's sorted from the API - which it is.
        let groupedData = _.groupBy(data, (row) => {return format(row['dt_txt'], "yyyy-MM-ddd")});
        const dates : string[] = Object.keys(groupedData);
        setDates(dates);
        setSelectedDate(dates[0]);
        
        _.remove(groupedData[dates[0]], (row) => {
            return isBefore(row['dt_txt'], new Date());
        });

        setForecastSeperatedByDates(groupedData);
    } 

   

    const columns = [
        {
            name: 'Date',
            selector: (row : any) => format(row.dt_txt, "dd MMM p"),
            grow: 8 
        },
        {
            name: 'Temp',
            selector: (row : any) => <p>{convertToCelsius(row.main.temp, 0)} &deg;C</p>
        },
        {
            name: 'Min Temp',
            selector: (row : any) => <p>{convertToCelsius(row.main.temp_min)} &deg;C</p>
        },
        {
            name: 'Max Temp',
            selector: (row : any) => <p>{convertToCelsius(row.main.temp_max)} &deg;C</p>
        },
        {
            name: 'Wind',
            selector: (row : any) => (row.wind.speed).toFixed(0) + " m/s"
        },
        {
            name: 'Description',
            selector: (row : any) => row.weather.length > 0 ? row.weather[0].description : 'No description',
            grow: 10 
        }
    ];



    return (<>
        {
            loading ? 
            <p> Loading... </p> :
            <div>
                <DataTable dense={true} className="forecast-table" columns={columns} data={forecastSeperatedByDates[selectedDate]} />
                <div className="dates">
                    {
                        _.map(dates, value => {
                            return <button onClick={e => setSelectedDate(value)}>{format(value, "dd MMM").toUpperCase()}</button> 
                        })
                    }
                </div>
            </div>
         }
    </>);


}

export default WeatherDetailed;