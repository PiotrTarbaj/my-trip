import React, { useState } from "react";

const GeoForm = ({ label, onSelect }) => {
  const [message, setMessage] = useState("");
  const [place, setPlace] = useState("");
  const [apiResults, setApiResults] = useState([]);

  const sendToApi = (place) => {
    const API = `https://nominatim.openstreetmap.org/search?q=${place}&format=geojson`;

    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (data.type === "FeatureCollection") {
          //zdublowanie pierwszej wartości, aby onChange listy rozwijalnej zadziałał i można było wybrać tą pierwszą wartośc
          if (data.features.length > 0) {
            setApiResults([data.features[0], ...data.features]);
          }
        }
      })
      .catch((error) => {
        setMessage(`Sending error: ${error}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (place.length < 2) {
      setMessage("Miejsce szukane powinno mięć przynajmniej 2 znaki.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      setMessage("");
      sendToApi(place);
    }
  };

  const handleChange = (value) => {
    let obj = JSON.parse(value);
    onSelect(obj.geometry.coordinates, obj.properties.display_name);
    setTimeout(() => {
      setApiResults([]);
    }, 1000);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          size="50"
          name="place"
          type="text"
          value={place}
          placeholder={label}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input name="submit" type="submit" value="Szukaj" />
      </form>
      <h3>{message}</h3>
      {apiResults.length > 0 && (
        <select onChange={(e) => handleChange(e.target.value)}>
          {apiResults.map((item, i) => {
            return (
              <option key={i} value={JSON.stringify(item)}>
                {item.properties.display_name}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default GeoForm;
