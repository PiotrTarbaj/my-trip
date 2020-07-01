import React, { useState } from "react";
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

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(true);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const onMapClick = (props, map, clickEvent) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }

    const latLong1 = new window.google.maps.LatLng(
      firstPlaceCoordinate.lat,
      firstPlaceCoordinate.lng
    );
    const latLong2 = new window.google.maps.LatLng(
      secondPlaceCoordinate.lat,
      secondPlaceCoordinate.lng
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
    console.log("marker click", props, marker);
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  return (
    <>
      <Map
        google={props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={initialCenter}
        onClick={onMapClick}
      >
        <Polyline
          path={[firstPlaceCoordinate, secondPlaceCoordinate]}
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeWeight={6}
        />

        <Marker
          onClick={onMarkerClick}
          name="Zielona Góra City"
          position={firstPlaceCoordinate}
          animation={props.google.maps.Animation.DROP}
        />
        <Marker
          onClick={onMarkerClick}
          name="Nowa Sól City"
          icon={icon}
          animation={props.google.maps.Animation.BOUNCE}
          position={secondPlaceCoordinate}
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
