import React from "react";
import "./weather.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setdata] = useState([]);
  const [location, setlocation] = useState("");

  useEffect(() => {
    const defaultWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Pune&units=Metric&appid=1c2ec5626d2bc656f82681e3ac3db204`;
      const response = await axios.get(url);
      setdata(response.data);
    };
    defaultWeather();
  }, []);
  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=1c2ec5626d2bc656f82681e3ac3db204`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setdata({ notFound: true });
      } else {
        setdata(response.data);
        setlocation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setdata({ notFound: true });
      } else {
        console.error("Error fetching weather data", error);
      }
    }
  };

  const updatelocation = (e) => {
    setlocation(e.target.value);
  };

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };
  const weathericon = (type) => {
    switch (type) {
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Sun":
        return <i className="bx bxs-sun"></i>;
      case "Snow":
        return <i className="bx bxs-snow"></i>;
      case "Drizzle":
        return <i className="bx bxs-cloud-drizzle"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-loc">
          <input
            type="text"
            value={location}
            onChange={updatelocation}
            onKeyDown={handlekeydown}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={fetchWeatherData}
          ></i>
        </div>
      </div>
      {data.notFound ? (
        <div className="not-found">
          <h3>City Not Found🚫</h3>
        </div>
      ) : (
        <div className="weather-data">
          {data.weather ? weathericon(data.weather[0].main) : null}
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}` : null}°C
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
