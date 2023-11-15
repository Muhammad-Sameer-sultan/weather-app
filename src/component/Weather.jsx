import { useEffect, useState, useContext } from "react";
import axios from "axios";
import weatherContext from "../context/context";
import { Container } from "react-bootstrap";
import thunder from "../assets/bg.jpg";
import bgNight from "../assets//night.webp";
import HourlyCard from "./HourlyCard";
import {
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiWindy,
  WiStrongWind,
} from "react-icons/wi";
import { MdDewPoint, MdOutlineMyLocation } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import ModalError from "./ModalError";
import ClockLoader from "react-spinners/ClockLoader";

const override= {
  display: "block",
  margin: "2rem auto",
  border:"2px solid white"
};

const Weather = () => {
  const [show, setShow] = useState(false);
  const [cityError, setcityError] = useState(false);
  const {
    apiKey,
    getCurrentDateTime,
    location,
    iconUrl,
    calculateDewPoint,
    convertTimestampToDateTime,
    weatherUpdateTime,
    weatherdata,
    setweatherdata,hourlyweather, sethourlyweather
  } = useContext(weatherContext);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=24.91&lon=67.08`
        );
        setweatherdata(response.data);
        const response1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&lat=24.91&lon=67.08`
        );
        sethourlyweather(response1.data);
        console.log(response1.data);
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);

        const response2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`
        );
        setweatherdata(response2.data);

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

  const updateBackground = () => {
    if (weatherdata && weatherdata.weather[0].icon.slice(-1) !== "d") {
      document.body.style.background = `url(${bgNight}) center/cover no-repeat fixed`;
    } else {
      document.body.style.background = `url(${thunder}) center/cover no-repeat fixed`;
    }
  };
  updateBackground();
  console.log(weatherdata);
  return (
    <div>
      {weatherdata && (
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "absolute",
            top: "0",
            paddingTop: "2.8rem",
            zIndex: "-1",
            // background: `url(${thunder}) center/cover no-repeat fixed`,
          }}
        >
          <Container>
            <div className="mian row justify-content-center align-items-center ">
              <div className="current d-flex flex-wrap justify-content-center align-items-center gap-2 mt-3">
                <div style={{ width: "100px", position: "relative" }}>
                  <div
                    className=""
                    style={{
                      position: "absolute",
                      // boxShadow: "0 0 1rem white",
                      zIndex: "-1",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(248, 249, 250, 0.2)",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <img
                    className="w-100 rounded-circle text-light "
                    src={iconUrl + weatherdata.weather[0].icon + ".png"}
                  />
                </div>

                <div className="text-center mt-3 text-light d-flex flex-wrap align-items-center justify-content-center gap-5">
                  <div className="">
                    <div className="ms-3 d-sm-flex text-start  align-items-center  justify-content-center ">
                      <div className="text-start">
                        <h3>{weatherdata.weather[0].main}</h3>
                        <h1 className="">
                          {weatherdata.main.temp} <sup>o</sup>C
                        </h1>
                        <h4>{getCurrentDateTime()}</h4>
                        <p>update as {weatherUpdateTime(weatherdata.dt)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-start">
                    <img
                      src={`https://flagcdn.com/40x30/${weatherdata.sys.country.toLowerCase()}.png`}
                      alt={""}
                      className=""
                    />
                    <h2 className="  text-start">{weatherdata.name}</h2>
                    <div className=" d-flex justify-content-center align-items-center gap-3 ">
                    <div>
                        <h4 className="text-start">Wind </h4>
                        <h4>
                          {(weatherdata.wind.speed * 3.6).toFixed(2)} Km/hr
                        </h4>
                      </div>
                      <div>
                        <div className="position-relative rounded-circle p-3 bg-black text-center">
                          {weatherdata.wind.deg && (
                            <div
                              className="fs-0 "
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
                      
                    </div>
                  </div>
                </div>
              </div>
<div className="col-sm-8 px-5 p-sm-0">
<div className="list-group  p-sm-2">
                <div className="row bg-light p-sm-3 rounded-2 mt-3">
                  <ul className="list-group  col-sm-6">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <WiHumidity className="fs-2 me-1" /> Humidity
                      </span>
                      <span className="">{weatherdata.main.humidity}%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <MdDewPoint className="fs-2 me-2" />
                        Dewpoint
                      </span>
                      <span className="">
                        {calculateDewPoint(
                          weatherdata.main.temp,
                          weatherdata.main.humidity
                        )}
                        %<sup>.</sup>
                      </span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <WiSunrise className="fs-2 me-2" />
                        Sunrise
                      </span>
                      <span className="">
                        {convertTimestampToDateTime(weatherdata.sys.sunset)}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <WiSunset className="fs-2 me-2" />
                        Sunset
                      </span>
                      <span className="">
                        {convertTimestampToDateTime(weatherdata.sys.sunrise)}
                      </span>
                    </li>
                  </ul>
                  <ul className="list-group  col-sm-6">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <WiStrongWind className="fs-2 me-1" /> Pressure
                      </span>
                      <span className="">{weatherdata.main.pressure}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <AiFillEyeInvisible className="fs-2 me-2" />
                        Visibility
                      </span>
                      <span className="">{weatherdata.visibility}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <WiWindy className="fs-2 me-2" />
                        Feels Like
                      </span>
                      <span className="">{weatherdata.main.feels_like}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <MdOutlineMyLocation className="fs-2 me-2" />
                        Coordinates
                      </span>
                      <span className="">
                        Longitude: {weatherdata.coord.lon} , Latitude:{" "}
                        {weatherdata.coord.lat}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
</div>
             
            </div>
            <div className="row ">
              {/* <HourlyCard key={hourlyweather.dt} hourlyweather={hourlyweather.list}/> */}
              {/* {console.log(hourlyweather.list[0])} */}
              {hourlyweather &&
                hourlyweather.list
                  .slice(0, 4)
                  .map((element) => (
                    <HourlyCard key={element.dt} hourlyweather={element} />
                  ))}
            </div>
          </Container>
        </div>
      )}
      {cityError &&
      <ModalError show={show}  setShow={ setShow} cityError={cityError.response.data}/>
      }
      {!weatherdata&&
           <ClockLoader
             color={"#ffffff"}
             loading={true}
             cssOverride={override} 
             size={150}
             aria-label="Loading Spinner"
             data-testid="loader"
           />
       
      }
    </div>
  );
};

export default Weather;
