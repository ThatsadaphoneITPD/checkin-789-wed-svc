import React, { useState, useEffect } from "react";
import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useGeolocation } from "react-use";
import { googleAPI_KEY } from "./constants-key";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

interface Props {
  markerPosition: { lat: number; lng: number };
  setMarkerPosition: (pos: { lat: number; lng: number }) => void;
  radius_km?: number;
  setRadius?: (radius: number) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "20px",
};

const GoogleMapComponent = (props: Props) => {
  const { latitude: geolocationLatitude, longitude: geolocationLongitude } =
    useGeolocation();

  const google_key_api = googleAPI_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: google_key_api as string,
  });

  const [map, setMap] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // ⬇️ Set map center to marker or geolocation
  useEffect(() => {
    if (props.markerPosition?.lat && props.markerPosition?.lng) {
      setMapCenter(props.markerPosition);
    } else if (geolocationLatitude && geolocationLongitude) {
      const currentLoc = { lat: geolocationLatitude, lng: geolocationLongitude };
      setMapCenter(currentLoc);
      props.setMarkerPosition(currentLoc);
    }
  }, [geolocationLatitude, geolocationLongitude, props.markerPosition]);

  const handleMapClick = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMarkerDrag = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMapLoad = (mapInstance: any) => {
    mapInstance.setOptions({
      enableMyLocation: true,
    });
    setMap(mapInstance);
  };

  return (
    <div>
      {isLoaded ? (
        <div>
          {/* 🔍 Tag & Radius Input */}
          <div className="my-2 flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
            <div className="flex-1">
              <Tag
                severity="info"
                value={
                  typeof props.markerPosition?.lat === "number" &&
                  typeof props.markerPosition?.lng === "number"
                    ? `${props.markerPosition.lat.toFixed(6)}, ${props.markerPosition.lng.toFixed(6)}`
                    : "N/A"
                }
              />
            </div>
            <div className="w-full md:w-15rem">
              <span className="contentfloat w-full">
                <InputText
                  id="radius_km"
                  type="number"
                  step="any"
                  className="w-full md:w-15rem"
                  value={props.radius_km !== undefined ? String(props.radius_km) : ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (props.setRadius) {
                      props.setRadius(isNaN(value) ? 0 : value);
                    }
                  }}
                />
                <label htmlFor="radius_km">ລັດສະໝີເຂົ້າເຖິ່ງ 0.1 km = 100 m</label>
              </span>
            </div>
          </div>

          {/* 🗺️ Google Map */}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter ?? props.markerPosition}
            zoom={15}
            onClick={handleMapClick}
            onLoad={handleMapLoad}
            options={{
              // mapTypeId: "satellite", // Default to satellite view
              mapTypeControl: true, // Show toggle control
              mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.DEFAULT,
                position: window.google.maps.ControlPosition.TOP_LEFT,
              },
              zoomControl: true,
              fullscreenControl: false,
              streetViewControl: false,
              clickableIcons: false,
            }}
          >
            <Marker
              position={props.markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
            {props.radius_km && (
              <Circle
                center={props.markerPosition}
                radius={props.radius_km * 1000} // km → m
                options={{
                  strokeColor: "#3B82F6",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#3B82F6",
                  fillOpacity: 0.15,
                }}
              />
            )}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
