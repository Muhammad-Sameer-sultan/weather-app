import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createRef, useContext, useEffect, useRef } from "react";
import weatherContext from "../context/context";
import favicon from "../assets/favicon.webp";
import { Link } from "react-router-dom";

function Navbars() {
  const toggleGo = useRef(null);
  const { setlocation } =
    useContext(weatherContext);

  const searchLocation = (e) => {
    e.preventDefault();
    if(e.target.elements.location.value){

      setlocation(e.target.elements.location.value);
      e.target.elements.location.value = "";
      toggleGo.current.click()
      // console.log();
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-nav fs-5 bg-blur" data-bs-theme="dark" style={{ background: 'url(blurred-background-image.jpg) fixed', backgroundSize: 'cover', backdropFilter: 'blur(5px)' }}>
      <Container>
      <img width={"35px"} src={favicon} alt="" />
          <Navbar.Brand to="/" className="fs-5">Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" ref={toggleGo} />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ms-5">
          <Nav.Link as={Link} to="/">Today</Nav.Link>
            <Nav.Link as={Link} to={"hourly"}>Hourley</Nav.Link>
            
          </Nav>
          <Form
              className="d-flex "
              data-bs-theme="light"
              onSubmit={searchLocation}
            >
              <Form.Control
                type="search"
                name="location"
                placeholder="Search for your location"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="outline-warning" >
                Go
              </Button>
            </Form>
        </Navbar.Collapse></Container>
    </Navbar>
      {/* <Navbar className="bg-nav fs-5" data-bs-theme="dark">
        <Container>
          <img width={"35px"} src={favicon} alt="" />
          <Navbar.Brand to="/" className="fs-5">Weather App</Navbar.Brand>
          
          <Nav className="me-auto ms-5">
          <Nav.Link as={Link} to="/">Today</Nav.Link>
            <Nav.Link as={Link} to={"hourly"}>Hourley</Nav.Link>
            
          </Nav>
          <Form
              className="d-flex "
              data-bs-theme="light"
              onSubmit={searchLocation}
            >
              <Form.Control
                type="search"
                name="location"
                placeholder="Search for your location"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="outline-warning">
                Go
              </Button>
            </Form>
        </Container>
      </Navbar> */}
    </>
  );
}

export default Navbars;
