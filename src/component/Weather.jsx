import { useEffect, useState, useContext } from "react";
import axios from "axios";
import weatherContext from "../context/context";
import { Container } from "react-bootstrap";
import thunder from "../assets/bg.jpg";
import HourlyCard from "./HourlyCard";


const Weather = () => {
  const [hourlyweather, sethourlyweather] = useState(null)

  const {
    apiKey,
    getCurrentDateTime,
    location,
    iconUrl,
    calculateDewPoint,
    convertTimestampToDateTime,
    weatherUpdateTime,
    weatherdata,
    setweatherdata,
  } = useContext(weatherContext);

  const fetchweatherByLocation = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${location}`

        );
      setweatherdata(response.data);
        const response1= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&q=${location}`)
        sethourlyweather(response1.data)
        console.log(response1.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=24.91&lon=67.08`
        );  
        setweatherdata(response.data);
        const response1= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&lat=24.91&lon=67.08`)
        sethourlyweather(response1.data)
        console.log(response1.data);
        // const position = await new Promise((resolve, reject) => {
        //   navigator.geolocation.getCurrentPosition(resolve, reject);
        // });

        // const { latitude, longitude } = position.coords;
        // console.log(latitude, longitude);

        // const response2 = await axios.get(
        //   `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`
        // );
        // setweatherdata(response2.data);
        
        // console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
        // Fallback to default coordinates if geolocation fails

        // console.log(weatherdata.weather.main);
      }
    };

    if (!location) {
      fetchData();
    } else {
      fetchweatherByLocation(location);
    }
  }, [location]);

  console.log(weatherdata);
  return (
    <div>
      {weatherdata && (
        <div
          style={{
            height: "100vh",
            width:"100%",
            position: "absolute",
            top:"0",
            paddingTop:"2.8rem",
            zIndex:"-1",
            background: `url(${thunder}) center/cover no-repeat fixed`,
          }}
        >
          <Container>
            <div className="mian row justify-content-center align-items-center ">
              <div className="current d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
                <div style={{ width: "100px", position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(248, 249, 250, 0.2)",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <img
                    className="w-100 rounded-circle"
                    src={iconUrl + weatherdata.weather[0].icon + ".png"}
                  />
                </div>

                <div className="text-center text-light d-flex flex-wrap align-items-center justify-content-center ">
                  <div className="">
                    <div className="ms-3 d-sm-flex text-start  align-items-center  justify-content-center ">
                      <div className="text-start">
                        <h3>{weatherdata.name}</h3>
                        <h1 className="">
                          {weatherdata.main.temp} <sup>o</sup>C
                        </h1>
                        <h5>{getCurrentDateTime()}</h5>
                        <p>update as {weatherUpdateTime(weatherdata.dt)}</p>
                      </div>
                      <h3 className=" ms-2">
                        {weatherdata.weather[0].description}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div className="ms-5 d-flex justify-content-center align-items-center gap-3 ">
                      <div>
                        <div className="position-relative rounded-circle p-4 bg-black text-center">
                 
                          {weatherdata.wind.deg && (
                            <div
                              className="fs-2 "
                              style={{
                                transform: `rotate(${weatherdata.wind.deg}deg)`,
                                top: "50%",
                                left: "50%",
                                transformOrigin: "center center",
                              }}
                            >
                              <i className="fas fa-arrow-down fs-2 "></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4>Wind </h4>
                        <h4>{(weatherdata.wind.speed * 3.6).toFixed(2)} Km/hr</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6" >
                <ul className="list-group mt-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Humidity
                    <span className="">{weatherdata.main.humidity}%</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Dewpoint
                    <span className="">
                      {calculateDewPoint(
                        weatherdata.main.temp,
                        weatherdata.main.humidity
                      )}
                      %<sup>.</sup>
                    </span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sunrise
                    <span className="">
                      {convertTimestampToDateTime(weatherdata.sys.sunset)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sunset
                    <span className="">
                      {convertTimestampToDateTime(weatherdata.sys.sunrise)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
            {/* <HourlyCard key={hourlyweather.dt} hourlyweather={hourlyweather.list}/> */}
            {/* {console.log(hourlyweather.list[0])} */}
              {hourlyweather &&
                hourlyweather.list.slice(0,4).map(element=><HourlyCard key={element.dt} hourlyweather={element}/>)
}
        </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Weather;
