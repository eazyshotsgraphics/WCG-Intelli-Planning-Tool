// src/components/MarkersFromGeoJSON.jsx
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function MarkersFromGeoJSON({ url, type }) {
  const [features, setFeatures] = useState([]);

  // Icons
  const hospitalIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  const schoolIcons = {
    Primary: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: markerShadow,
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
    }),
    Secondary: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: markerShadow,
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
    }),
    Combined: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: markerShadow,
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
    }),
  };

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((gj) => alive && setFeatures(Array.isArray(gj.features) ? gj.features : []))
      .catch((e) => console.error("Failed to load GeoJSON:", e));
    return () => { alive = false; };
  }, [url]);

  if (!features.length) return null;

  return (
    <>
      {features.map((f, idx) => {
        if (f?.geometry?.type !== "Point") return null;
        const [lng, lat] = f.geometry.coordinates || [];
        if (lat == null || lng == null) return null;

        if (type === "hospital") {
          const {
            NAME, CLASSIFICATION, CATEGORY, SUB_DISTRICT, TOWN,
            TELNO, EMAIL, STATUS,
          } = f.properties || {};
          return (
            <Marker key={`h-${idx}`} position={[lat, lng]} icon={hospitalIcon}>
              <Popup>
                <div>
                  <strong>{NAME || "Unknown Hospital"}</strong><br />
                  Classification: {CLASSIFICATION || "N/A"}<br />
                  Category: {CATEGORY || "N/A"}<br />
                  Subdistrict: {SUB_DISTRICT || "N/A"}<br />
                  Town: {TOWN || "N/A"}<br />
                  Tel: {TELNO || "N/A"}<br />
                  Email: {EMAIL || "N/A"}<br />
                  Status: {STATUS || "N/A"}
                </div>
              </Popup>
            </Marker>
          );
        }

        // schools
        const {
          NAME, SCHOOLTYPE, EDUCATIONDISTRICT, CIRCUIT, MEDIUMOFINSTRUCTION,
          SECTOR, CONTROL, EMIS, SCHOOL_STATUS,
        } = f.properties || {};

        const typeText = SCHOOLTYPE || "";
        const icon =
          typeText.includes("Primary")   ? schoolIcons.Primary   :
          typeText.includes("Secondary") ? schoolIcons.Secondary :
          typeText.includes("Combined")  ? schoolIcons.Combined  :
          new L.Icon.Default();

        return (
          <Marker key={`s-${idx}`} position={[lat, lng]} icon={icon}>
            <Popup>
              <div>
                <strong>{NAME || "Unknown School"}</strong><br />
                Type: {SCHOOLTYPE || "N/A"}<br />
                District: {EDUCATIONDISTRICT || "N/A"}<br />
                Circuit: {CIRCUIT || "N/A"}<br />
                Medium: {MEDIUMOFINSTRUCTION || "N/A"}<br />
                Sector: {SECTOR || "N/A"}<br />
                Control: {CONTROL || "N/A"}<br />
                Status: {SCHOOL_STATUS || "N/A"}<br />
                EMIS: {EMIS || "N/A"}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
