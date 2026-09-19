import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

function RecenterMap({ position }: { position: LatLngExpression | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [map, position]);

  return null;
}

function MapView() {
  const samplePosition: [number, number] = [31.4187, 73.0791];
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const findCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by this browser.");
      return;
    }

    setIsLocating(true);
    setLocationMessage("Requesting your current location...");

    navigator.geolocation.getCurrentPosition(
      (location) => {
        setUserPosition([location.coords.latitude, location.coords.longitude]);
        setLocationMessage("Your current location is shown on the map.");
        setIsLocating(false);
      },
      (error) => {
        if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
          setLocationMessage("Location permission was denied. Please allow access and try again.");
        } else {
          setLocationMessage("Your location could not be obtained. Please try again.");
        }
        setIsLocating(false);
      },
    );
  };

  return (
    <div className="map-view">
      <div className="map-controls">
        <button
          className="location-button"
          type="button"
          onClick={findCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? "Finding Location..." : "Use My Current Location"}
        </button>
        {locationMessage && (
          <p className="location-message" role="status">
            {locationMessage}
          </p>
        )}
      </div>

      <MapContainer center={samplePosition} zoom={13} className="leaflet-map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={samplePosition}>
          <Popup>Sample Location</Popup>
        </Marker>

        {userPosition && (
          <>
            <RecenterMap position={userPosition} />
            <Marker position={userPosition}>
              <Popup>Your Current Location</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;