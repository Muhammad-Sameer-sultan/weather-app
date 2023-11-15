import Accordion from "react-bootstrap/Accordion";
import icon from "../assets/favicon.webp";
import { MdDewPoint, MdOutlineMyLocation } from "react-icons/md";
import { useContext } from "react";
import weatherContext from "../context/context";

function AccordMain() {
  const {hourlyweather, sethourlyweather}=useContext(weatherContext)
  console.log(hourlyweather);
  return (
    <Accordion className="col-lg-8 bg-light p-4 rounded-2" defaultActiveKey="0">
        <h4>Thursday, 16 November</h4>
        {hourlyweather && 
        hourlyweather.list.map((data)=>(
          <Accordion.Item key={data.dt} eventKey={data.dt}>
          <Accordion.Header>
              <div className="row w-100 d-flex justify-content-between align-items-center">
                  <div className="col-1 fs-5"><span>15:00</span></div>
                  <div className="col-2"><h4 className="m-0">25 <sup>o</sup>C</h4></div>
                  <div className="col-3 justify-content-between align-items-center"><img width={"40px"} src={icon} alt="weather icon" /> <span className="fw-bold ms-2">Party cloudy</span></div>
                  <div className="col-1"></div>
                  <div className="col-1 fs-5">1%</div>
                  <div className="col-3 fs-5"><MdDewPoint/> <span className="ms-1 me-2">13 Km/hr</span> <MdDewPoint/></div>
              </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <div className="card p-3">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                      <MdDewPoint className="fs-3 me-2" />
                      <div className="">
                        <span>Humidity</span>
                        <h5 className="fw-bolder">44%</h5>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        ))}
      
     
    </Accordion>
  );
}

export default AccordMain;
