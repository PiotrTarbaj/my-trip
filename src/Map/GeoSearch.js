import React, { useState } from "react";

const GeoSearch = () => {
  const [message, setMessage] = useState("");
  const [apiResults, setApiResults] = useState([]);

  const placeCoordinate = {
    lat: 50.066707,
    lng: 19.932748,
  };

  const getImageFullSizePath = (thumbnailPath) => {
    var arrayPath = thumbnailPath.split("/");
    var imageName = arrayPath[arrayPath.length - 1];
    var n = imageName.indexOf("-");
    imageName = imageName.substring(n + 1, imageName.length);
    imageName = imageName.replace(".svg.png", ".svg");
    var newPath = thumbnailPath.replace("thumb/", "");
    var n = newPath.indexOf(imageName);
    return newPath.substring(0, n + imageName.length);
  };

  const sendToApi = (place) => {
    var apiEndpoint = "https://pl.wikipedia.org/w/api.php";
    var params = `action=query&generator=geosearch&prop=coordinates|pageimages&ggscoord=${place.lat}|${place.lng}&format=json`;

    fetch(apiEndpoint + "?" + params + "&origin=*")
      .then((response) => response.json())
      .then((data) => {
        setApiResults(data.query.pages);
      })
      .catch((error) => {
        setMessage(`Sending error: ${error}`);
      });
  };

  return (
    <>
      <h3>{message}</h3>
      <h1>Atrakcje w okolicy {Object.keys(apiResults).length}</h1>
      <button onClick={() => sendToApi(placeCoordinate)}>Znajdź</button>
      {Object.keys(apiResults).length > 0 &&
        Object.keys(apiResults).map((element, index, array) => (
          <div key={index}>
            <h4>{apiResults[element].title}</h4>
            <img
              src={getImageFullSizePath(apiResults[element].thumbnail.source)}
              width="150px"
              alt={apiResults[element].title}
            />
            <p>
              Link:{" "}
              <a
                href={`https://pl.wikipedia.org/?curid=${element}`}
                target="_blank"
              >{`https://pl.wikipedia.org/?curid=${element}`}</a>
            </p>
          </div>
        ))}
    </>
  );
};

export default GeoSearch;
