import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import Footer from './components/Footer';
import './App.css';

export default function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const hasSearched = Boolean(weatherData);

  const resetApp = () => {
    setCity('');
    setWeatherData(null);
    setForecastData([]);
    setError('');
  };

  useEffect(() => {

    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      setError('');

      try {
        const apiKey = import.meta.env.VITE_apiKey;
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);

        if(!weatherRes.ok) {
          throw new Error('City not found');
        }

        const weather = await weatherRes.json();
        setWeatherData(weather);

        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);

        if(!forecastRes.ok) {
          throw new Error('Forecast not found');
        }

        const forecast = await forecastRes.json();
        setForecastData(forecast.list.filter(item => item.dt_txt.includes('12:00:00')));
      }
      catch(err) {
        setError(err.message);
        setWeatherData(null);
        setForecastData([]);
      }
      finally {
        setLoading(false);
      };
    };

    fetchWeather();

  }, [city, unit]);

  return (
    <div className={`app ${!hasSearched ? 'animated-bg' : ''}`}>
      {!hasSearched && (
        <div className="weather-background-icons">
          {Array.from({ length: 12 }).map((_, i) => {
            const icons = ['☀️', '🌤️', '🌧️', '⛅'];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const size = Math.random() * 2 + 1;
            return (
              <div key={i} className="weather-icon-bg"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  fontSize: `${size}rem`,
                }}>
                {icon}
              </div>
            );
          })}
        </div>
      )}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        unit={unit} 
        setUnit={setUnit}
        onLogoClick={resetApp} 
      />
      <SearchBar onSearch={setCity} />
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {weatherData && <WeatherDisplay key={unit} data={weatherData} unit={unit} />}
      {forecastData.length > 0 && <Forecast data={forecastData} unit={unit} />}
      <Footer />
    </div>
  );  
}