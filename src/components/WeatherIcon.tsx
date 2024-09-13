import Default from '../../public/weather.svg';
import Clouds from '../assets/clouds.svg';
import Rain from '../assets/rain.svg';


function WeatherIcon(props : any) {

    const renderIcon = () => {
        switch(props.icon){
            case 'clouds':
                return Clouds;
            case 'rain':
                return Rain; 
            default:
                return Default;
        }
    }

    return (
        <div>
            <img width={50} height={50} src={renderIcon()} />
        </div>
    );
}

export default WeatherIcon;