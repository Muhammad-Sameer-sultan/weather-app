// import { useState } from 'react'

import './App.css'
import Navbars from './component/Navbar'
import Weather from './component/Weather'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherProvider from './context/WeatherProvider';


function App() {

  return (
   <>
   <WeatherProvider>
   <Navbars/>
   <Weather/>
   </WeatherProvider>
   </>
  )
}

export default App
