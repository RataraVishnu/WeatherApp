import { useEffect, useState } from "react";
import "../Styles/ForecastWeather.css";
import Doubts from './doubt.js'

const ForecastWeather = ({ forecastWeather }) => {

    // console.log(forecastWeather);
    const [dayData, setDayData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        if (forecastWeather && typeof forecastWeather === 'object') {
            const getDataOnHours = () => {
                try {
                    let dayItems = {};
                    forecastWeather.list.forEach(items => {
                        // console.log(items)
                        const date = items.dt_txt.split(' ')[0]

                        if (!dayItems[date]) {
                            dayItems[date] = []
                        }
                        dayItems[date].push(items)

                    });
                    // console.log(dayItems)

                    let minMaxData = {};

                    if (dayItems && typeof dayItems === 'object') {
                        const minMax = Object.entries(dayItems);

                        minMax.forEach(([date, items]) => {
                            const minTemps = items.map(item => item.main.temp_min);
                            const maxTemps = items.map(item => item.main.temp_max);

                            const today = new Date().toISOString().split('T')[0];

                            if (date !== today) {
                                minMaxData[date] = {
                                    min: Math.min(...minTemps),
                                    max: Math.max(...maxTemps)
                                }
                            }
                        });
                    }
                    // console.log(minMaxData)



                    const our_time = new Date().toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
                    // console.log(our_time);
                    let dayWeatherData = [];

                    if (dayItems && typeof dayItems === 'object') {

                        const forcastValues = Object.values(dayItems);
                        let latest = null;
                        forcastValues.forEach((forcastItems) => {
                            // console.log('all items',forcastItems)

                            const forcastItem = Object.values(forcastItems);
                            forcastItem.forEach((items) => {
                                // console.log(`indi itmes${index}`, items.main.temp_min)

                                const item = items;
                                const wet_time = item.dt_txt.split(' ')[1];

                                if (wet_time <= our_time) {
                                    latest = item;
                                }
                                // else {
                                //     break;
                                // }
                            })



                            function describeDateFlexible(dateStr) {
                                const formats = [
                                    { regex: /^\d{4}-\d{2}-\d{2}$/, order: ["year", "month", "day"] }, // YYYY-MM-DD
                                    { regex: /^\d{2}-\d{2}-\d{4}$/, order: ["day", "month", "year"] }, // DD-MM-YYYY
                                    { regex: /^\d{2}-\d{2}-\d{4}$/, order: ["month", "day", "year"] }  // MM-DD-YYYY
                                ];

                                let parts, formatUsed;

                                for (let format of formats) {
                                    if (format.regex.test(dateStr)) {
                                        parts = dateStr.split("-");
                                        formatUsed = format.order;
                                        break;
                                    }
                                }

                                if (!parts || !formatUsed) return "Invalid or unsupported date format";

                                const [a, b, c] = parts.map(Number);
                                let year, month, day;

                                formatUsed.forEach((key, i) => {
                                    if (key === "year") year = parts[i];
                                    if (key === "month") month = parts[i];
                                    if (key === "day") day = parts[i];
                                });

                                const date = new Date(`${year}-${month}-${day}`);
                                if (isNaN(date)) return "Invalid date";

                                return {
                                    day: date.toLocaleDateString("en-US", { weekday: "short" }),
                                    month: date.toLocaleDateString("en-US", { month: "short" }),
                                    date: date.getDate(), // 👈 This is the day of the month
                                    year: date.getFullYear()
                                };
                            }




                            if (latest && new Date(latest.dt_txt.split(' ')[0]).toISOString().split('T')[0] !== new Date().toISOString().split('T')[0]) {
                                // console.log("Latest matching forecast:", latest);
                                // console.log(latest.dt_txt)
                                const forecastDate = latest.dt_txt.split(' ')[0];
                                const dateFormat = describeDateFlexible(latest.dt_txt.split(' ')[0])

                                const combinedData = {
                                    ...latest,
                                    date: dateFormat,
                                    minTemp: minMaxData[forecastDate]?.min || 'N/A',
                                    maxTemp: minMaxData[forecastDate]?.max || 'N/A'
                                };
                                dayWeatherData.push(combinedData)
                            } else {
                                console.log("No forecast matched the condition.");
                            }
                        })
                    }
                    // console.log('dydy', dayWeatherData)
                    setDayData(dayWeatherData)

                }
                catch (error) {
                    console.error('Error while getting Data', error)
                    setError(error);
                }
            }
            getDataOnHours();
        }
    }, [forecastWeather])




    return (
        <div >
            <div className="day-forecast">
                <h3 className="day-forecast-title">5-Day Forecast</h3>
                {error && <div className="error-message">{error}</div>}
                {!error && dayData.length === 0 && (
                    <div className="no-data">No forecast data available.</div>
                )}
                {dayData.map((item, index) => (
                    <div className="day-item" key={index}>
                        <div className="day-left">
                            <div className="day-date">{item.date.date}, {item.date.month}, {item.date.day}</div>
                            <div className="day-icon">
                                <img alt={item.weather[0].description} src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                            </div>
                            <div className="day-description">{item.weather[0].description}</div>
                        </div>
                        <div className="day-right">
                            <div className="day-temp-min">{(item.minTemp).toFixed(0)}°C</div>
                            <div className="day-temp-max">{(item.maxTemp).toFixed(0)}°C</div>
                            <div className="day-humidity"><img id='img' alt="humidity" src='./humidity.png' /><span>{(item.main.humidity).toFixed()}%</span></div>
                            <div className="day-windspeed"><img id='img' alt="wind" src='./wind.png' /><span>{(item.wind.speed).toFixed(1)} m/s</span></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <Doubts data={doubtData} /> */}
        </div>


    )
};

export default ForecastWeather;