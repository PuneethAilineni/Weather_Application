import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { StateContextProvider } from './Context'
import HourlyWeather from './Components/HourlyWeather'

ReactDOM.render(
  <Router>
    <StateContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hourly" element={<HourlyWeather />} />
      </Routes>
    </StateContextProvider>
  </Router>,
  document.getElementById('root')
)
