// import React from 'react'
import { useContext } from "react";
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import weatherContext from "../context/context";
import {WiWindDeg } from "react-icons/wi";


const HourlyCard = ({ hourlyweather }) => {
  const { iconUrl} = useContext(weatherContext);
  return (
    <div className="col-lg-3 p-3" >
      <Card className="" style={{ width: "16rem" }}>
        <h6 className="bg-blue border border-3 text-center p-2 fs-4" 
        >{hourlyweather.dt_txt.slice(10,16)}</h6>
        <Card.Body>
          <h4 className="text-center">{hourlyweather.weather[0].description}</h4>
          <div className="row justify-content-center align-items-center">
            <div className="col-4">
              <Card.Img
                variant=""
                className="img-fluid rounded-circle border border-1 bg-blue"
                src={iconUrl + hourlyweather.weather[0].icon + ".png"}
              />
            </div>
            <h3 className="col-7 text-start">
              {hourlyweather.main.temp} <sup>o</sup>C
            </h3>
          </div>
          <div className=" d-flex justify-content-center align-items-center gap-3  row">
            <div className="col-4">
              <div className="p-2">
                {hourlyweather.wind.deg && (
                  <WiWindDeg className="fs-1 "
                  style={{
                    transform: `rotate(${hourlyweather.wind.deg}deg) `,
                    fontSize:"4rem",
                    height: "4rem",
                    width: "4rem"
                  }}/>
                  // <div
                    // className="fs-1 rounded-circle w-100  position-absolute col-2"
                    // style={{

                    //   transform: `rotate(${hourlyweather.wind.deg}deg) `,
                    //   top: "-0.5rem",
                    //   left: "-0.5rem",
                    //   // transform: "translate(-50%, -50%)",
                    //   transformOrigin: "center center",
                    // }}
                  // >
                  //   <i className=" fas fa-arrow-down  text-light fs-6"></i>
                  // </div>
                )}
              </div>
            </div>
            <div className="col-7 text-start">
              <h4>Wind </h4>
              <h5>{(hourlyweather.wind.speed * 3.6).toFixed(2)} Km/hr</h5>
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
