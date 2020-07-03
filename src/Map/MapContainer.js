import React, { useState, useEffect } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
  Places,
} from "google-maps-react";

const LoadingContainer = (props) => <div>Trwa ładowanie mapy...</div>;

const mapStyles = {
  width: "100%",
  height: "100%",
};

const initialCenter = {
  lat: 51.9377276,
  lng: 15.5028484,
};

const firstPlaceCoordinate = {
  lat: 51.9377276,
  lng: 15.5028484,
};

const secondPlaceCoordinate = {
  lat: 51.815222,
  lng: 15.717336,
};

const icon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const MapContainer = ({
  google,
  loaded,
  firstCoordinate,
  secondCoordinate,
}) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(true);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  useEffect(() => {
    console.log("useEffect", secondCoordinate.coordinate);
  }, []);

  const onMapClick = (props, map, clickEvent) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }

    const latLong1 = new window.google.maps.LatLng(
      firstCoordinate.coordinate.lat,
      firstCoordinate.coordinate.lng
    );
    const latLong2 = new window.google.maps.LatLng(
      secondCoordinate.coordinate.lat,
      secondCoordinate.coordinate.lng
    );
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      latLong1,
      latLong2
    );
    console.log(distance);
  };

  const onInfoWindowClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const onMarkerClick = (props, marker) => {
    //console.log("marker click", props, marker);
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  return (
    <>
      <Map
        google={google}
        zoom={10}
        style={mapStyles}
        initialCenter={initialCenter}
        onClick={onMapClick}
      >
        <Polyline
          path={[firstCoordinate.coordinate, secondCoordinate.coordinate]}
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeWeight={6}
        />

        <Marker
          onClick={onMarkerClick}
          name={firstCoordinate.name}
          position={firstCoordinate.coordinate}
          animation={google.maps.Animation.DROP}
        />
        <Marker
          onClick={onMarkerClick}
          name={secondCoordinate.name}
          icon={icon}
          animation={google.maps.Animation.BOUNCE}
          position={secondCoordinate.coordinate}
        />
        <InfoWindow
          onClose={(e) => onInfoWindowClose(e)}
          marker={activeMarker}
          visible={showingInfoWindow}
        >
          <div>
            <h4>{selectedPlace && selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    </>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyC0_VegvvMKiPLmuG9yjM0pigegjI_TpZo",
  LoadingContainer: LoadingContainer,
})(MapContainer);
