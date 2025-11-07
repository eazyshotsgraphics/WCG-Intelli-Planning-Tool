// src/components/MapView.jsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

import GeoJSONLayer from "./GeoJSONLayer";
import Legend from "./Legend";

import "leaflet/dist/leaflet.css";

// Fix Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapView() {
  const [schools, setSchools] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    fetch("/Public_Ordinary_Schools.geojson")
      .then((res) => res.json())
      .then(setSchools);
    fetch("/hospitals.geojson")
      .then((res) => res.json())
      .then(setHospitals);
  }, []);

  return (
    <MapContainer center={[-34.05, 18.6]} zoom={11} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <LayersControl position="topright">
        {hospitals && (
          <LayersControl.Overlay checked name="Hospitals">
            <MarkerClusterGroup
              iconCreateFunction={(cluster) =>
                L.divIcon({
                  html: `<div class="custom-cluster hospital-cluster">${cluster.getChildCount()}</div>`,
                  className: "cluster-icon",
                  iconSize: L.point(40, 40, true),
                })
              }
            >
              <GeoJSONLayer data={hospitals} url="/hospitals.geojson" />
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        )}

        {schools && (
          <LayersControl.Overlay checked name="Public Ordinary Schools">
            <MarkerClusterGroup
              iconCreateFunction={(cluster) =>
                L.divIcon({
                  html: `<div class="custom-cluster school-cluster">${cluster.getChildCount()}</div>`,
                  className: "cluster-icon",
                  iconSize: L.point(40, 40, true),
                })
              }
            >
              <GeoJSONLayer data={schools} url="/Public_Ordinary_Schools.geojson" nameField="NAME" />
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>

      <Legend />
    </MapContainer>
  );
}

export default MapView;
