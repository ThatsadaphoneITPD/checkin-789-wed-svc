import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { googleAPI_KEY } from "./constants-key";
interface Props {
    lat: any, lng: any,
    width?: string, height?: string,
}

const GoogleMapShow: React.FC<Props> = ({  lat, lng,  width = '100%',  height = '70px' }) => {
    const google_key_api = googleAPI_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: google_key_api as string,
    });
    const handleMapLoad = (map: any) => {
        map.setOptions({
            enableMyLocation: true,
        });
    };
    const containerStyle = { width, height, borderRadius: '5px', };

    return (
        <div>
            {isLoaded ? (
                <div>
                    {/* <div >
                        {parseFloat(props.lng).toFixed(6) + "," + parseFloat(props.lng).toFixed(6)}
                    </div> */}
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                        zoom={15}
                        onLoad={handleMapLoad} // Set the onLoad callback
                    >
                        <Marker
                            position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                        />
                    </GoogleMap>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default GoogleMapShow;
