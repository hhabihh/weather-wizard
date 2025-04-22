import React from "react";
import './WeatherDisplay.css';

export default function WeatherDisplay({ data, unit }) {

    const locale = 'en-US';
    const weatherIcon = data.weather[0].icon

    return (
        <div className="weather-display">
            <div className="weather-main-card">
                <div className="location">
                    <h2>{data.name}, {data.sys.country}</h2>
                </div>
                <div className="date-time">
                    <p id="date">{new Date(data.dt * 1000).toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    <p>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="weather-info">
                    <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} className="weather-icon" alt="weather Icon"></img>
                    <div className="temp">
                        <p>{Math.round(data.main.temp)} {unit === 'metric' ? '°C' : '°F'}</p>
                    </div>
                    <div className="temp-details">
                        <p>{data.weather[0].description}</p>
                        <p>Feels like {Math.round(data.main.feels_like)} {unit === 'metric' ? '°C' : '°F'}</p>
                    </div>
                </div>
            </div>
            <div className="weather-details-container">
                <div className="weather-details">
                    <h4>Weather Details</h4>
                </div>
                <div className="weather-details-cards">
                    <div className="details-card">
                        <h5>High</h5>
                        <p>{Math.round(data.main.temp_max)} {unit === 'metric' ? '°C' : '°F'}</p>
                    </div>
                    <div className="details-card">
                        <h5>Low</h5>
                        <p>{Math.round(data.main.temp_min)} {unit === 'metric' ? '°C' : '°F'}</p>
                    </div>
                    <div className="details-card">
                        <h5>Humidity</h5>
                        <p>{data.main.humidity} %</p>
                    </div>
                    <div className="details-card">
                        <h5>Wind Speed</h5>
                        <p>{data.wind.speed} m/s</p>
                    </div>
                    <div className="details-card">
                        <h5>Pressure</h5>
                        <p>{data.main.pressure} kPa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}