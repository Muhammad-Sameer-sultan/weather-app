// import { useState } from 'react'

import './App.css'
import Navbars from './component/Navbar'
import Weather from './component/Weather'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherProvider from './context/WeatherProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HourlyPage from './component/HourlyPage';


function App() {

  return (
   <>
   <Router>
   <WeatherProvider>
   <Navbars/>
   <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="hourly" element={<HourlyPage />} />
        </Routes>
   </WeatherProvider>
   </Router>
   </>
  )
}

export default App
