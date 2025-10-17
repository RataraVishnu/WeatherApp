import "../Styles/DayWeather.css";
// import { useEffect, useState } from "react";

const DayWeather = ({ hourWeather }) => {
    // console.log(hourWeather)

    // const [hourlyData, setHourlyData] = useState([]);

    // useEffect(() => {
    //     const gethourData = () => {
    //         let today = new Date().toISOString().split("T")[0];
    //         let hourData = [];
    //         hourWeather.hourly.time.slice(0, 24).map((time, index) => {
    //             if (time.includes(today)) {
    //                 hourData.push({
    //                     time: time.split("T")[1],
    //                     temperature: hourWeather.hourly.temperature_2m[index],
    //                     weathercode: hourWeather.hourly.weathercode[index],
    //                 });
    //             }
    //         })
    //         setHourlyData(hourData);
    //     }
    //     gethourData();
    // }, [hourWeather])

    return (
        <div className="day-weather-container">
            <div className="hourly-forecast">
                <h3 className="forecast-title">24-Hour Forecast</h3>
                <div className="hourly-items">
                    {hourWeather && hourWeather.map((item, index) => (
                        <div key={index} className="hourly-item">
                            <p className="hourly-time">{item.time}</p>
                            <img alt="hourly-image" src={item.iconUrl}></img>
                            <span>{item.description}</span>
                            <p className="hourly-temp">{item.temperature.toFixed(0)}°C</p>
                        </div>
                    ))}
                    {/* <div className="hourly-item">
                        <p className="hourly-time">1 AM</p>
                        <img alt="hourly-image" src="#"></img>
                        <p className="hourly-temp">5 °C</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
};

export default DayWeather;