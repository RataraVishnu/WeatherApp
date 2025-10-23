import { useState, useEffect } from "react";
import "../Styles/CurrentWeather.css";

const CurrentWeather = ({ currentWeather, city, setCity, list, loc, setList, wrapperRef }) => {
    console.log(city)

    const showSuggestions = list.length > 0;

    return (
        <div >
            <div className="weather-header" ref={wrapperRef}>
                <h1 className="weather-title">Weather Today</h1>
                <div className="weather-control">
                    <input
                        className="weather-input"
                        placeholder="search desired city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                    <div className="suggestions-list" style={{ visibility: showSuggestions ? 'visible' : 'hidden' }}>
                        {list.map((item, index) => (
                            <p key={index} className="suggestion-item" onClick={() => { setCity(item.name); setList([]); }}>
                                {item.display_name}
                            </p>
                        ))};
                    </div>
                    <button className="search-button" onClick={() => {if(!city.trim()) return; loc(city);}}>Current Location</button>
                </div>
            </div>

            <div className="current-weather">
                <div className="current-weather-header">
                    <div className="current-weather-location">
                        <h2 id="current-location">{currentWeather?.name}</h2>
                        <p id="current-weather-description">{currentWeather?.weather[0]?.description}</p>
                    </div>
                    <div className="current-weather-icon">
                        <img src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`} alt={currentWeather?.weather[0]?.description} />
                    </div>
                </div>
                <div className="current-weather-details">
                    <div className="current-weather-data">
                        <h2 id="current-temp">{currentWeather?.main?.temp.toFixed()}°C</h2>
                        <p id="currently-feels-like">
                            Feels like {currentWeather?.main?.feels_like.toFixed()}°C
                        </p>
                    </div>
                    <div className="current-details-grid">
                        <div className="current-humidity">
                            <img alt="humidity" src="./humidity.png" />
                            <div className="text-container">
                                <label>Humidity</label>
                                <span>{currentWeather?.main?.humidity} %</span>
                            </div>
                        </div>
                        <div className="current-wind">
                            <img alt="wind" src='./wind.png' />
                            <div className="text-container">
                                <label>Wind</label>
                                <span>{currentWeather?.wind?.speed} m/s</span>
                            </div>
                        </div>
                        <div className="current-pressure">
                            <img alt="pressure" src='./pressure.png' />
                            <div className="text-container">
                                <label>Pressure</label>
                                <span>{currentWeather?.main?.pressure} hPa</span>
                            </div>
                        </div>
                        <div className="current-visibility">
                            <img alt="visibility" src='./visibility.png' />
                            <div className="text-container">
                                <label>Visibility</label>
                                <span>{currentWeather?.visibility / 1000} Km</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="sun-times">
                    <div className="sun-up-down">
                        <div className="sun-time">
                            <img alt="sunrise" src='./sunrise.png' />
                            <div>
                                <label>Sunrise</label>
                                <span>{new Date(currentWeather?.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLocaleUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="sun-up-down">
                        <div className="sun-time">
                            <img alt="sunset" src='./sunset.png' />
                            <div>
                                <label>Sunset</label>
                                <span>{new Date(currentWeather?.sys?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLocaleUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CurrentWeather;
