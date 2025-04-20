import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

export interface Coordinates {
  lat: number;
  lng: number;
}

interface MapWithMarkerProps {
  coordinates?: Coordinates;
  onPositionChange: (position: Coordinates) => void;
  address: string;
}

export function MapWithMarker({ coordinates, address }: MapWithMarkerProps) {
  const defaultPosition = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState<Coordinates>(
    coordinates || defaultPosition
  );

  const handleMarkerClick = () => {
    setIsOpen(!isOpen);
  };

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
      onClick={() => setIsOpen(false)}
    >
      <Marker
        position={position}
        draggable={false}
        onClick={handleMarkerClick}
        icon={{
          url: '/icons/map-marker.svg',
          scaledSize: new window.google.maps.Size(60, 60),
          anchor: new window.google.maps.Point(30, 60)
        }}
      />
      {isOpen && address && (
        <InfoWindow
          position={position}
          onCloseClick={() => setIsOpen(false)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -60)
          }}
        >
          <div className="min-w-52">
            <div className="text-sm text-shade font-medium leading-[1.25rem] mb-2">
              {address.split('|').map((part, index) => (
                <div key={index} className="whitespace-pre-line">
                  {part.trim()}
                </div>
              ))}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a73e8] text-sm hover:text-[#174ea6] hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}