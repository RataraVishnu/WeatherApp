import React from "react";
import { useState, useEffect } from "react";
import '../Styles/MainWeather.css';
import CurrentWeather from "./Currentweather";
import DayWeather from "./DayWeather";
import ForecastWeather from "./ForecastWeather";


const MainWeather = () => {

    const apiKey = '44bf8207618c6b90a9471ad31fc07862';

    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourWeather, setHourWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lon) {
            async function fetchWeather() {
                try {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

                    const response = await fetch(url);
                    const data = await response.json();
                    // console.log('weather open:', data);
                    setCurrentWeather(data);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }

            fetchWeather();

            async function fetchHourWeather() {
                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,wind_speed_10m,weathercode&current_weather=true&timezone=auto`);
                    const data = await response.json();
                    // console.log(data);
                    // setHourWeather(data);

                    // for(let i = 0; i < data.hourly.time.length; i++){
                    //     let cu_ti = (data.current_weather.time).split("T")[0];
                    //     if(data.hourly.time[i].includes(cu_ti)){
                    //         console.log(i);
                    //     }
                    // }
                    const weatherCodeToIcon = (code) => {
                        const weatherCodes = {
                            0: '01d',
                            1: '02d',
                            2: '03d',
                            3: '04d',
                            45: '50d',
                            48: '50d',
                            51: '09d',
                            53: '09d',
                            55: '09d',
                            56: '09d',
                            57: '09d',
                            61: '10d',
                            63: '10d',
                            65: '10d',
                            66: '13d',
                            67: '13d',
                            71: '13d',
                            73: '13d',
                            75: '13d',
                            77: '13d',
                            80: '09d',
                            81: '09d',
                            82: '09d',
                            85: '13d',
                            86: '13d',
                            95: '11d',
                            96: '11d',
                            99: '11d',
                        };
                        return weatherCodes[code] || '01d';
                    };

                    function weathercode_to_description(code){
                        const weather_descriptions = {
                            0: "Clear sky",
                            1: "Mainly clear",
                            2: "Partly cloudy",
                            3: "Overcast",
                            45: "Fog",
                            48: "Depositing rime fog",
                            51: "Light drizzle",
                            53: "Moderate drizzle",
                            55: "Dense drizzle",
                            56: "Light freezing drizzle",
                            57: "Dense freezing drizzle",
                            61: "Slight rain",
                            63: "Moderate rain",
                            65: "Heavy rain",
                            66: "Light freezing rain",
                            67: "Heavy freezing rain",
                            71: "Slight snow fall",
                            73: "Moderate snow fall",
                            75: "Heavy snow fall",
                            77: "Snow grains",
                            80: "Slight rain showers",
                            81: "Moderate rain showers",
                            82: "Violent rain showers",
                            85: "Slight snow showers",
                            86: "Heavy snow showers",
                            95: "⚡ slight or moderate",
                            96: "⚡ with slight hail",
                            99: "⚡ with heavy hail"
                        }

                        return weather_descriptions[code] || "Clear sky";
                    }

                    const today = data.current_weather.time.split('T')[0];
                    const hourData = [];

                    data.hourly.time.forEach((time, index) => {
                        if (time.includes(today)) {
                            const weathercode = data.hourly.weathercode[index];
                            const iconCode = weatherCodeToIcon(weathercode);
                            const description = weathercode_to_description(weathercode)
                            hourData.push({
                                time: time.split('T')[1],
                                temperature: data.hourly.temperature_2m[index],
                                iconUrl: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
                                description : description,
                            });
                        }
                    });

                    setHourWeather(hourData);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }

            fetchHourWeather();

            async function fetchForecastWeather() {
                try {
                    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
                    const response = await fetch(url);
                    const data = await response.json();
                    // console.log(data);
                    // console.log(data.list);
                    setForecastWeather(data)

                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }

            fetchForecastWeather();
        }

    }, [coords]);

    return (
        <div className="main-weather-container">
            <CurrentWeather currentWeather={currentWeather} />
            <DayWeather hourWeather={hourWeather} />
            <ForecastWeather forecastWeather={forecastWeather} />
        </div>
    );
};

export default MainWeather;