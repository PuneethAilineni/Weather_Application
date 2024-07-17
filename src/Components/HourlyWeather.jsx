import React from 'react';
import { useStateContext } from '../Context';
import { useDate } from '../Utils/UseDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import night from '../assets/icons/night.png';
import rainyNight from '../assets/icons/rainy-night.png';

const HourlyWeather = () => {
  const { weather, thisLocation } = useStateContext();
  const { time } = useDate();

  const getIcon = (condition, hour) => {
    const date = new Date(hour.datetimeEpoch * 1000);
    const hours = date.getHours();
    const isNight = hours >= 18 || hours < 6;

    if (isNight) {
      if (condition.toLowerCase().includes('rain')) {
        return rainyNight;
      } else {
        return night;
      }
    } else {
      if (condition.toLowerCase().includes('cloud')) {
        return cloud;
      } else if (condition.toLowerCase().includes('rain')) {
        return rain;
      } else if (condition.toLowerCase().includes('clear')) {
        return sun;
      } else if (condition.toLowerCase().includes('thunder')) {
        return storm;
      } else if (condition.toLowerCase().includes('fog')) {
        return fog;
      } else if (condition.toLowerCase().includes('snow')) {
        return snow;
      } else if (condition.toLowerCase().includes('wind')) {
        return wind;
      }
    }
    return sun; // Default icon for day
  };

  if (!weather || !weather.hours) {
    return <p>No hourly data available</p>;
  }

  const formatTime = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='w-full h-screen text-black px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Hourly Weather</h1>
      </nav>
      <div className='w-full text-center my-4 shadow-lg z-10 relative'>
        <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
          <img src={getIcon(weather.conditions, { datetimeEpoch: weather.datetimeEpoch })} alt="weather_icon" />
          <p className='font-bold text-5xl flex justify-center items-center'>{Number((weather.tempmax - 32) * (5 / 9)).toFixed(1)}°C</p>
        </div>
        <div className='font-bold text-center text-xl'>
          {thisLocation}
        </div>
        <div className='w-full flex justify-between items-center mt-4'>
          <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
          <p className='flex-1 text-center p-2'>{time}</p>
        </div>
        <div className='w-full flex justify-between items-center mt-4 gap-4'>
          <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{weather.humidity} gm/m³</p></p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Max Temp:</p>
          <p className=''>{weather.tempmax ? (Number((weather.tempmax-32)*(5/9)).toFixed(1)) : 'N/A'}°C</p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Min Temp:</p>
          <p className=''>{weather.tempmax ? (Number((weather.tempmin-32)*(5/9)).toFixed(1)) : 'N/A'}°C</p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Sunrise:</p>
          <p className=''>{weather.sunriseEpoch ? formatTime(weather.sunriseEpoch) : 'N/A'}</p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Sunset:</p>
          <p className=''>{weather.sunsetEpoch ? formatTime(weather.sunsetEpoch) : 'N/A'}</p>
        </div>
        <hr className='bg-slate-600' />
        <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
          {weather.conditions}
        </div>
      </div>
      <main className='w-full flex overflow-x-auto py-4 px-[10%]'>
        {weather.hours ? weather.hours.map((hour, index) => (
          <div key={index} className='flex flex-col items-center min-w-[5rem]'>
            <div className='font-bold text-center text-xl'>
              {new Date(hour.datetimeEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <img src={getIcon(hour.conditions, hour)} alt="weather_icon" className='w-12 h-12'/>
            <div className='font-semibold text-center'>
              {Number((hour.temp - 32) * (5 / 9)).toFixed(1)}°C
            </div>
          </div>
        )) : <p>No hourly data available</p>}
      </main>
    </div>
  );
};

export default HourlyWeather;
