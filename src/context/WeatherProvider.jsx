  // NewsProvider.js
  import {useState}from 'react'
  import PropTypes from 'prop-types';
  import weatherContext from './context';
  import axios from "axios";
  import thunder from "../assets/bg.jpg";
import bgNight from "../assets/night.webp";



  const WeatherProvider = ({children}) => {
    const [hourlyweather, sethourlyweather] = useState(null);
    const [location, setlocation] = useState(null);
    const [weatherdata, setweatherdata] = useState(null);
    const [cityError, setcityError] = useState(false);
    const [show, setShow] = useState(false);



    const apiKey = import.meta.env.VITE_API_KEY;
  const iconUrl='https://openweathermap.org/img/w/'

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
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    // const formattedDateTime = `${date.toString().slice(0,24)}`;
    const ampm = hours>12?"AM":"PM";
    const formatedHours= hours%12 || 12;
    const formattedDateTime = `${formatedHours}:${minutes}:${seconds} ${ampm}`;

    return formattedDateTime;
  }
  function getCurrentDateTime() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
  
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }
  
  function timestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
  
    const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  
    return formattedTime;
  }
  const fetchweatherByLocation = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${location}`
      );
      setweatherdata(response.data);
      const response1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&q=${location}`
      );
      sethourlyweather(response1.data);

      console.log(response1.data);
    } catch (error) {
      console.error("Error:", error);
      setShow(true);
      setcityError(error)
    }
  };
  const updateBackground = () => {
    if (weatherdata && weatherdata.weather[0].icon.slice(-1) !== "d") {
      document.body.style.background = `url(${bgNight}) center/cover no-repeat fixed`;
    } else {
      document.body.style.background = `url(${thunder}) center/cover no-repeat fixed`;
    }
  };





    return (
      <weatherContext.Provider value={{updateBackground,show, setShow,fetchweatherByLocation,cityError, setcityError,hourlyweather, sethourlyweather,timestampToTime,getCurrentDateTime,location,apiKey, setlocation,iconUrl,calculateDewPoint,convertTimestampToDateTime,weatherUpdateTime,weatherdata, setweatherdata}}>
          {children}
      </weatherContext.Provider>
    )
  }
  WeatherProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  export default WeatherProvider