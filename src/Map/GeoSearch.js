import React, { useState, useEffect } from "react";

const GeoSearch = ({ placeCoordinate }) => {
  const [message, setMessage] = useState("");
  const [apiResults, setApiResults] = useState([]);

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
    var params = `action=query&generator=geosearch&prop=coordinates|pageimages&ggscoord=${place.lat}|${place.lng}&format=json&pithumbsize=300`;

    fetch(apiEndpoint + "?" + params + "&origin=*")
      .then((response) => response.json())
      .then((data) => {
        setApiResults(data.query.pages);
      })
      .catch((error) => {
        setMessage(`Sending error: ${error}`);
      });
  };

  useEffect(() => {
    sendToApi(placeCoordinate);
  }, [placeCoordinate]);

  return (
    <div className="geosearch-container">
      <h1>Atrakcji w okolicy: {Object.keys(apiResults).length}</h1>
      {Object.keys(apiResults).length > 0 &&
        Object.keys(apiResults).map((element, index, array) => (
          <div className="attraction-item" key={index}>
            {apiResults[element].thumbnail !== undefined && (
              <>
                <h4>{apiResults[element].title}</h4>
                <a
                  href={getImageFullSizePath(
                    apiResults[element].thumbnail.source
                  )}
                  target="_blank"
                >
                  <img
                    src={apiResults[element].thumbnail.source}
                    alt={apiResults[element].title}
                  />
                </a>
                <p>
                  Link:{" "}
                  <a
                    href={`https://pl.wikipedia.org/?curid=${element}`}
                    target="_blank"
                  >{`https://pl.wikipedia.org/?curid=${element}`}</a>
                </p>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default GeoSearch;
