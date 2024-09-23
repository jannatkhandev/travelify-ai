// src/components/Map.jsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

function MapUpdater({ points, selectedPoint }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(point => [point.latitude, point.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);

  useEffect(() => {
    if (selectedPoint) {
      map.setView([selectedPoint.latitude, selectedPoint.longitude], 15);
    }
  }, [selectedPoint, map]);

  return null;
}

export default function Map({ points, selectedPoint }) {
  const center = points.length > 0 ? [points[0].latitude, points[0].longitude] : [0, 0];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]}>
          <Popup>
            <strong>{point.name}</strong><br />
            {point.description}
          </Popup>
        </Marker>
      ))}
      <MapUpdater points={points} selectedPoint={selectedPoint} />
    </MapContainer>
  );
}