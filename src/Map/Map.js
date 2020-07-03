import React, { useState } from "react";
import MapContainer from "../Map/MapContainer";
import GeoForm from "../Map/GeoForm";
import LinkTo from "../LinkTo/LinkTo";
import WeatherInfo from "../Map/WeatherInfo";
import GeoSearch from "../Map/GeoSearch";
import Trip from "../Trip/Trip";
import "../Map/Map.scss";

const Map = () => {
  const [firstPlaceCoordinate, setFirstPlaceCoordinate] = useState(null);
  const [secondPlaceCoordinate, setSecondPlaceCoordinate] = useState(null);
  const [distanceTrip, setDistanceTrip] = useState(0);

  const handleSelectedFirst = (coordinate, name) => {
    let first = {
      coordinate: {
        lat: coordinate[1],
        lng: coordinate[0],
      },
      name: name,
    };
    setFirstPlaceCoordinate(first);
  };

  const handleSelectedSecond = (coordinate, name) => {
    let second = {
      coordinate: {
        lat: coordinate[1],
        lng: coordinate[0],
      },
      name: name,
    };
    setSecondPlaceCoordinate(second);
  };

  const getDistance = (distance) => {
    setDistanceTrip(distance);
  };

  return (
    <div className="container-map">
      <nav>
        <div>
          <GeoForm label="Miejsce startowe:" onSelect={handleSelectedFirst} />
          <GeoForm label="Miejsce docelowe:" onSelect={handleSelectedSecond} />
        </div>
        <div className="trip-info">
          <Trip distance={distanceTrip} />
        </div>
        <div className="main-link">
          <LinkTo path="/" title="Powrót do strony głównej" />
        </div>
      </nav>
      {firstPlaceCoordinate && secondPlaceCoordinate && (
        <div>
          <div className="info-box-container">
            <WeatherInfo placeCoordinate={secondPlaceCoordinate.coordinate} />
            <GeoSearch placeCoordinate={secondPlaceCoordinate.coordinate} />
          </div>
          <MapContainer
            firstCoordinate={firstPlaceCoordinate}
            secondCoordinate={secondPlaceCoordinate}
            getDistance={getDistance}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
