import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react'

const containerStyle = {
    width: '100%',
    height: '90vh',
  };
  
  const center = {
    lat: -6.1754,
    lng: 106.8272,
  };

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBO4jusfkbnGvFVf_ZNNe4EAz64bSaxXnE',
      });
  return isLoaded ? (
    <div className="flex items-center justify-center">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Map