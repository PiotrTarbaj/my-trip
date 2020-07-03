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
  lat: 51.9431453,
  lng: 19.2254742,
};

const initialZoom = 6.63;

const icon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const MapContainer = ({
  google,
  firstCoordinate,
  secondCoordinate,
  getDistance,
}) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(true);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const calcDistance = () => {
    // http://www.movable-type.co.uk/scripts/latlong.html
    const lat1 = firstCoordinate.coordinate.lat;
    const lon1 = firstCoordinate.coordinate.lng;

    const lat2 = secondCoordinate.coordinate.lat;
    const lon2 = secondCoordinate.coordinate.lng;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return ((R * c) / 1000).toFixed(1);
  };

  useEffect(() => {
    getDistance(calcDistance());
  }, [firstCoordinate, secondCoordinate]);

  const onMapClick = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
    const latLong1 = new google.maps.LatLng(
      firstCoordinate.coordinate.lat,
      firstCoordinate.coordinate.lng
    );
    const latLong2 = new google.maps.LatLng(
      secondCoordinate.coordinate.lat,
      secondCoordinate.coordinate.lng
    );
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      latLong1,
      latLong2
    );
    console.log((distance / 1000).toFixed(1), calcDistance());
  };

  const onInfoWindowClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  return (
    <>
      <Map
        google={google}
        zoom={initialZoom}
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
            <h4 className="marker-info">
              {selectedPlace && selectedPlace.name}
            </h4>
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
