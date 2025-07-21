import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { googleAPI_KEY } from "./constants-key";

interface Props {
    lat: number | string;
    lng: number | string;
    width?: string;
    height?: string;
}

const GoogleMapShow: React.FC<Props> = ({
    lat,
    lng,
    width = "100%",
    height = "70px",
}) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: parseFloat(lat as string),
        lng: parseFloat(lng as string),
    });

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: googleAPI_KEY,
    });

    useEffect(() => {
        const parsedLat = parseFloat(lat as string);
        const parsedLng = parseFloat(lng as string);

        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
            setCenter({ lat: parsedLat, lng: parsedLng });

            if (mapRef.current) {
                mapRef.current.panTo({ lat: parsedLat, lng: parsedLng });
            }
        }
    }, [lat, lng]);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        map.setOptions({
            disableDefaultUI: true,
        });
    };

    const containerStyle = {
        width,
        height,
        borderRadius: "5px",
    };

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={handleMapLoad}
                >
                    <Marker position={center} />
                </GoogleMap>
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    );
};

export default GoogleMapShow;
