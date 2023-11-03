  // NewsProvider.js
  import {useState}from 'react'
  import weatherContext from './context';


  const WeatherProvider = ({children}) => {

    const [location, setlocation] = useState(null);
    const [weatherdata, setweatherdata] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;
  const iconUrl='https://openweathermap.org/img/wn/'

  // fuctions
  // to calcualte calculateDewPoint
  function calculateDewPoint(temperatureCelsius, humidityCelsius) {
    const a = 17.27;
    const b = 237.7;

    const alpha = (a * temperatureCelsius) / (b + temperatureCelsius) + Math.log(humidityCelsius / 100);

    const dewPointTemperature = (b * alpha) / (a - alpha);

    // Convert dew point temperature to humidity percentage
    const dewPointHumidity = 100 * (Math.exp((17.27 * dewPointTemperature) / (237.7 + dewPointTemperature)) / Math.exp((17.27 * temperatureCelsius) / (237.7 + temperatureCelsius)));

    return dewPointHumidity.toFixed(2);
  }

  function weatherUpdateTime(targetTimestamp) {
    const currentdate = new Date();
    const targetTime = new Date(targetTimestamp * 1000); // Convert target timestamp to milliseconds
  
    const differenceInMilliseconds = currentdate - targetTime;
  
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
  
    if(hours){
      return `${hours} hours ago`;
      
    }
    else if(minutes){
      return `${minutes} minutes ago`;
      
    }else{
      
      return `${seconds} seconds ago`;
    }

    // Format the time difference as HH:MM:SS
    // const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  }

  function convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    // const formattedDateTime = `${date.toString().slice(0,24)}`;
    const ampm = hours>12?"AM":"PM";
    const formatedHours= hours%12 || 12;
    const formattedDateTime = `${formatedHours}:${minutes}:${seconds} ${ampm}`;

    return formattedDateTime;
  }

  convertTimestampToDateTime(1661870592)





    return (
      <weatherContext.Provider value={{location,apiKey, setlocation,iconUrl,calculateDewPoint,convertTimestampToDateTime,weatherUpdateTime,weatherdata, setweatherdata}}>
          {children}
      </weatherContext.Provider>
    )
  }

  export default WeatherProvider