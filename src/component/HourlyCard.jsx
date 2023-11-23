// import React from 'react'
import { useContext } from "react";
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import weatherContext from "../context/context";
import {WiWindDeg } from "react-icons/wi";


const HourlyCard = ({ hourlyweather }) => {
  const { iconUrl} = useContext(weatherContext);
  return (
    <div className="col-lg-3  col-sm-6 px-5 py-2 p-sm-3 py-sm-2 " >
      <Card className="w-100 " >
        <h6 className="bg-blue border border-3 text-center p-2 fs-4 m-0" 
        >{hourlyweather.dt_txt.slice(10,16)}</h6>
        <Card.Body>
          <h4 className="text-center ">{hourlyweather.weather[0].description.toUpperCase()}</h4>
          <div>
            <div className="row justify-content-center align-items-center">
            <div className="col-3  col-sm-4 text-end">
              <Card.Img
                variant=""
                className="img-fluid rounded-circle border border-1 bg-blue"
                src={iconUrl + hourlyweather.weather[0].icon + ".png"}
              />
            </div>
            <h4 className="col-7 text- m-0">
              {hourlyweather.main.temp} <sup>o</sup>C
            </h4>
          </div>
          <div className=" d-flex justify-content-center align-items-center   row">
            <div className="col-4">
              <div className=" text-end">
                {hourlyweather.wind.deg && (
                  <WiWindDeg className=""
                  style={{
                    transform: `rotate(${hourlyweather.wind.deg}deg) `,
                    fontSize:"4rem",
                
                  }}/>
              
                )}
              </div>
            </div>
            <div className="col-7 text-start">
              <h4 className="m-0">Wind </h4>
              <h5>{(hourlyweather.wind.speed * 3.6).toFixed(2)} Km/hr</h5>
            </div>
          </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

HourlyCard.propTypes = {
  hourlyweather: PropTypes.shape({
    dt_txt: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      deg: PropTypes.number,
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HourlyCard;
