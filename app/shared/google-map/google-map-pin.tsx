import React, { useState, useEffect } from "react";
import { Circle, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
  width: '100%',
  height: '400px',
  borderRadius: '20px',
};


const GoogleMapComponent = (props: Props) => {
  const { latitude: geolocationLatitude, longitude: geolocationLongitude, error } = useGeolocation();
  const defaultMapCenter = { lat: geolocationLatitude, lng: geolocationLongitude }
  const [map, setMap] = useState<any>(null); // Store the GoogleMap instance
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  const google_key_api = googleAPI_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: google_key_api as string,
  });

  

   useEffect(() => {
    if (markerPosition.lat && markerPosition.lng) {
      setMapCenter(markerPosition);
    } else if (geolocationLatitude && geolocationLongitude) {
      const currentLoc = { lat: geolocationLatitude, lng: geolocationLongitude };
      setMapCenter(currentLoc);
      setMarkerPosition(currentLoc);
    }
  }, [geolocationLatitude, geolocationLongitude]);

  // useEffect(() => {
  //   if (geolocationLatitude !== null && geolocationLongitude !== null) {
  //     setLatitude(geolocationLatitude);
  //     setLongitude(geolocationLongitude);
  //     setMapCenter({ lat: geolocationLatitude, lng: geolocationLongitude });
  //     props.setMarkerPosition({ lat: geolocationLatitude, lng: geolocationLongitude });
  //   }
  // }, [geolocationLatitude, geolocationLongitude]);

  const handleMarkerDrag = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMapClick = (event: any) => {
    props.setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  const handleMapLoad = (map: any) => {
    map.setOptions({
      enableMyLocation: true,
    });
    setMap(map);
  };

  return (
    <div>
      {isLoaded ? (
        <div>
         <div className="my-2 flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
            <div className="flex-1">
              <Tag
                severity="info"
                value={
                  typeof props.markerPosition?.lat === 'number' &&
                  typeof props.markerPosition?.lng === 'number'
                    ? `${props.markerPosition.lat.toFixed(6)}, ${props.markerPosition.lng.toFixed(6)}`
                    : "N/A"
                }
              />
            </div>
            <div className="w-full md:w-auto">
              <span className="contentfloat w-full">
                <InputText
                  id="radius_km"
                  type="number"
                  step="any"
                  className="w-full md:w-40"
                  value={props.radius_km !== undefined ? String(props.radius_km) : ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (props.setRadius) {
                      props.setRadius(isNaN(value) ? 0 : value);
                    }
                  }}
                />
                <label htmlFor="content">ລັດສະໝີ km ເຂົ້າເຖິ່ງ</label>
              </span>
            </div>
          </div>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick}
            onLoad={handleMapLoad} // Set the onLoad callback
          >
            <Marker
              position={props.markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
            <Circle
              center={props.markerPosition}
              radius={props?.radius_km * 1000} // convert km to meters
              options={{
                strokeColor: "#3B82F6",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#3B82F6",
                fillOpacity: 0.15,
              }}
            />
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GoogleMapComponent;