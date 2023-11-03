import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect } from 'react';
import weatherContext from '../context/context';
import axios from 'axios';

function Navbars() {


  const {setlocation,location,setweatherdata,apiKey}=useContext(weatherContext)


 
  

 



const searchLocation =(e)=>{
  e.preventDefault();
  setlocation(e.target.elements.location.value);
  console.log("Location:", location);
  e.target.elements.location.value=""
 
}

  return (
 <>
 <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Weather App</Navbar.Brand>
          <Nav className="ms-auto ">
          <Form className="d-flex " data-bs-theme="light" onSubmit={searchLocation}>
            <Form.Control
              type="search"
              name="location"
              placeholder="Search for your location"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-warning">Go</Button>
          </Form>
          </Nav>
        </Container>
      </Navbar>
 </>
  );
}

export default Navbars;