import React from "react";
import './Forecast.css';

export default function Forecast({ data, unit }) {

    const locale = 'en-US';

    return (
        <div className="forecast">
            <h3 id="forecast-title">5-Day Forecast</h3>
            <div className="forecast-cards">
                {data.map((item, index) => {
                    const weatherIcon = item.weather[0].icon;
                    return(
                        <div key={index} className="forecast-card">
                            <div className="date-info">
                                <h5>{new Date(item.dt_txt).toLocaleDateString(locale, {weekday: 'short'})}</h5>
                                <p>{new Date(item.dt_txt).toLocaleDateString(locale, {month: 'short', day: 'numeric'})}</p>
                            </div>
                            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} className="forecast-icon"></img>
                            <h4 id="forecast-temp">{Math.round(item.main.temp)} {unit === 'metric' ? '°C' : '°F'}</h4>
                            <p>{item.weather[0].description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}