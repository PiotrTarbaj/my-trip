import React, { useState } from "react";
import MapContainer from "../Map/MapContainer";
import GeoForm from "../Map/GeoForm";
import "../Map/Map.scss";

const Map = () => {
  const [firstPlaceCoordinate, setFirstPlaceCoordinate] = useState(null);
  const [secondPlaceCoordinate, setSecondPlaceCoordinate] = useState(null);

  const handleSelectedFirst = (coordinate, name) => {
    let first = {
      coordinate: {
        lat: coordinate[1],
        lng: coordinate[0],
      },
      name: name,
    };
    setFirstPlaceCoordinate(first);
    console.log("first", coordinate, first);
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
    console.log("second", second);
  };

  return (
    <>
      <div>
        <GeoForm label="Początek:" onSelect={handleSelectedFirst} />
        <GeoForm label="Koniec:" onSelect={handleSelectedSecond} />
      </div>
      {firstPlaceCoordinate && secondPlaceCoordinate && (
        <MapContainer
          firstPlaceCoordinate={firstPlaceCoordinate}
          secondPlaceCoordinate={secondPlaceCoordinate}
        />
      )}
    </>
  );
};

export default Map;
