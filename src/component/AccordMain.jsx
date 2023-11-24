import Accordion from "react-bootstrap/Accordion";
import {  MdOutlineCompress } from "react-icons/md";
import {
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiWindy,
  WiWindDeg,
} from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureEmpty } from "react-icons/fa6";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useEffect} from "react";
import weatherContext from "../context/context";
import axios from 'axios'


function AccordMain() {
  const { location,updateBackground,fetchweatherByLocation,hourlyweather,iconUrl, timestampToTime,apiKey ,setweatherdata,sethourlyweather} =
    useContext(weatherContext);

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
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const { latitude, longitude } = position.coords;
  
        const response2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`
        );
        setweatherdata(response2.data);
  
      } catch (error) {
        console.error("Error:", error);
       
      }
    };
  
    if (!location) {
      fetchData();
    } else {
      fetchweatherByLocation(location);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function timestampToDateTime(timestamp) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const currentDate = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()]
    const day = ('0' + currentDate.getDate()).slice(-2);
  
 
  
    const formattedDateTime = `${dayOfWeek}, ${day} ${month} `;
    return formattedDateTime;
  }
  let lastDate=null;
  const setLastDate=(date)=>{
    lastDate=date
  }
  updateBackground();

  return (
    
    <Accordion className="col-lg-8 z-1 bg-light p-4 rounded-2" defaultActiveKey="0">
      {hourlyweather && <h3>{hourlyweather.city.name}  <img
                      src={`https://flagcdn.com/40x30/${hourlyweather.city.country.toLowerCase()}.png`}
                      alt={""}
                      className="ms-2"
                    /></h3>}
      {hourlyweather &&
        hourlyweather.list.map((data) => (
          <div key={data.dt}>
            {timestampToDateTime(lastDate) !== timestampToDateTime(data.dt) && (
              <>
                <h4 className="mt-4">{timestampToDateTime(data.dt)}</h4>
                {setLastDate(data.dt)}
                
              </>
            )}
            <Accordion.Item eventKey={data.dt}>
              <Accordion.Header>
                <div className="row w-100  d-flex justify-content-between align-items-center">
                  <div className="col-5   col-sm-2 col-md-2 fs-5">
                    <span>{data.dt_txt.slice(10, 16)}</span>
                  </div>
                  <div className="col-7  col-sm-4 col-md-3 p-0 d-flex justify-content-start align-items-center">
                    <img
                      width={"40px"}
                      src={iconUrl + data.weather[0].icon + ".png"}
                      alt="weather icon"
                    />{" "}
                    <div className="fw-bold fs-6 ms-2 ">
                      {data.weather[0].description.toUpperCase()}
                    </div>
                  </div>
                  <div className="col-5 col-sm-2 col-md-2">
                    <span className=" fs-5  ">
                      {data.main.temp} <sup>o</sup>C
                    </span>
                  </div>
                  
                  <div className="col-1 d-none d-md-inline-block   fs-6 ">
                    <WiHumidity />
                    {data.main.humidity}
                  </div>
                  <div className="col-7 col-sm-4 col-md-4 text-start fs-6  fs-sm-5">
                    <WiWindy className="fs-2" />{" "}
                    <span className="ms-1 me-2">{data.wind.speed} Km/hr</span>{" "}
                    <WiWindDeg
                      className="fs-2 d-none d-md-inline-block"
                      style={{ transform: `rotate(${data.wind.deg}deg)` }}
                    />
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="card p-3">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-12 col-sm-4">
                        <div className="">
                          <div className="d-flex justify-content-center align-items-center">
                            <FaTemperatureHigh className="fs-3 me-2" />
                            <div className="">
                              <span>Max Temperature</span>
                              <h5 className="fw-bolder">
                                {data.main.temp_max} <sup>o</sup>C
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-between align-items-center">
                            <MdOutlineCompress className="fs-3 me-2" />
                            <div className="">
                              <span>Pressure</span>
                              <h5 className="fw-bolder">
                                {data.main.pressure}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-between align-items-center">
                            <WiSunrise className="fs-3 me-2" />
                            <div className="">
                              <span>Sunrise</span>
                              <h5 className="fw-bolder">
                                {timestampToTime(hourlyweather.city.sunrise)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-12 col-sm-4">
                        <div className="">
                          <div className="d-flex justify-content-center align-items-center">
                            <FaTemperatureEmpty className="fs-3 me-2" />
                            <div className="">
                              <span>Min Temperature</span>
                              <h5 className="fw-bolder">
                                {data.main.temp_min} <sup>o</sup>C
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-between align-items-center">
                            <AiFillEyeInvisible className="fs-3 me-2" />
                            <div className="">
                              <span>Visibility</span>
                              <h5 className="fw-bolder">{data.visibility}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-between align-items-center">
                            <WiSunset className="fs-3 me-2" />
                            <div className="">
                              <span>Sunset</span>
                              <h5 className="fw-bolder">
                                {timestampToTime(hourlyweather.city.sunset)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </div>
        ))}
        
    </Accordion>
  );
}

export default AccordMain;
