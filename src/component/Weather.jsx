import { useEffect, useState, useContext } from "react";
import axios from "axios";
import weatherContext from "../context/context";
import { Container } from "react-bootstrap";
import thunder from "../assets/thunder.gif"

const Weather = () => {
  

  const { apiKey,location ,iconUrl,calculateDewPoint,convertTimestampToDateTime,weatherUpdateTime,weatherdata, setweatherdata} = useContext(weatherContext);
  const fetchweatherByLocation = async (location) => {
    try {
      const response =await  axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${location}`
      );
      setweatherdata(response.data);
    

   
   
      
    } catch (error) {
      console.error('Error:', error);
     
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await  axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=24.91&lon=67.08`
        );
        setweatherdata(response.data);
      

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
     
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude );

        const response2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`
        );
        setweatherdata(response2.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to default coordinates if geolocation fails
   
        // console.log(weatherdata.weather.main);
      }
    };
    console.log(location)
    if(!location){
      fetchData();
    }
    else{
      fetchweatherByLocation(location)
    }
  }, [location]);



  console.log(weatherdata);
  return (
    <div>
      {weatherdata && (
        <div style={{ height: "100vh",background:`url(${thunder}) center/cover no-repeat fixed`}}>
          <Container>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="text-center">
                <h3>{weatherdata.name}</h3>
                <div className="">
                  <img className="img-fluid " src={iconUrl+weatherdata.weather[0].icon+".png"} />
                  <h1 className="d-inline-block">
                    {weatherdata.main.temp}<sup>.</sup> C
                  </h1>
                </div>
                <h5>{weatherdata.weather[0].description}</h5>
                <p>update as {weatherUpdateTime(weatherdata.dt)}</p>

                {/* Additional weather information or components can be added here */}
              </div>
              <div style={{ width: "40%" }}>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Humidity
                    <span className="">{weatherdata.main.humidity}%</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Dewpoint
                    <span className="">
                      {calculateDewPoint(weatherdata.main.temp,weatherdata.main.humidity)}%<sup>.</sup>
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Wind
                    <span className="">{(weatherdata.wind.speed*3.6).toFixed(2)} Km/hr</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sunrise
                    <span className="">{convertTimestampToDateTime(weatherdata.sys.sunset)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sunset
                    <span className="">{convertTimestampToDateTime(weatherdata.sys.sunrise)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Weather;
