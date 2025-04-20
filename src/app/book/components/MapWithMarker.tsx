import { GoogleMap, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

export interface Coordinates {
  lat: number;
  lng: number;
}

interface MapWithMarkerProps {
  coordinates?: Coordinates;
  onPositionChange: (position: Coordinates) => void;
}

export function MapWithMarker({ coordinates }: MapWithMarkerProps) {
  const defaultPosition = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  const [position, setPosition] = useState<Coordinates>(
    coordinates || defaultPosition
  );

  // Update position when coordinates change from parent
  useEffect(() => {
    if (coordinates && (coordinates.lat !== position.lat || coordinates.lng !== position.lng)) {
      setPosition(coordinates);
    }
  }, [coordinates, position]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={position}
      zoom={15}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true
      }}
    >
      <Marker
        position={position}
        draggable={false}
      />
    </GoogleMap>
  );
}