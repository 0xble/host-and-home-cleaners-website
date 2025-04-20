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
        styles: [
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
              {
                color: "#878787"
              }
            ]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f9f5ed"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#c9c9c9"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#aee0f4"
              }
            ]
          }
        ],
        disableDefaultUI: true, // Removes most controls
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false
      }}
    >
      <Marker
        position={position}
        draggable={false}
        icon={{
          url: '/icons/map-marker.svg',
          scaledSize: new window.google.maps.Size(60, 60),
          anchor: new window.google.maps.Point(30, 60)
        }}
      />
    </GoogleMap>
  );
}