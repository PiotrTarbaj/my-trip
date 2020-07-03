import React, { useState, useEffect } from "react";

const WeatherInfo = ({ placeCoordinate }) => {
  const [isData, setIsData] = useState(false);
  const [apiResultsWeather, setApiResultsWeather] = useState([]);
  const [apiResultsMain, setApiResultsMain] = useState([]);

  const apiKey = "562b8ae9683647da716b61115038f714";

  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/weather?lang=pl&units=metric&lat=${placeCoordinate.lat}&lon=${placeCoordinate.lng}&appid=${apiKey}`;
    console.log(API);
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setIsData(true);
          Object.keys(data).map((key) => {
            if (key === "weather") {
              setApiResultsWeather(data[key][0]);
            }
            if (key === "main") {
              setApiResultsMain(data[key]);
            }
          });
        } else {
          setIsData(false);
        }
      })
      .catch((error) => {
        setIsData(false);
      });
  }, [placeCoordinate]);

  return (
    <>
      {isData && (
        <div className="weather-container">
          <img
            src={`http://openweathermap.org/img/wn/${apiResultsWeather.icon}@4x.png`}
            alt={apiResultsWeather.main}
          />
          <h4>{apiResultsWeather.description}</h4>
          <ul>
            <li>
              <strong>Temperatura:</strong> {apiResultsMain.temp}°C
            </li>
            <li>
              <strong>Odczuwalna:</strong> {apiResultsMain.feels_like}°C
            </li>
            <li>
              <strong>Ciśnienie:</strong> {apiResultsMain.pressure} hPa
            </li>
            <li>
              <strong>Wilgotność:</strong> {apiResultsMain.humidity}%
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default WeatherInfo;
