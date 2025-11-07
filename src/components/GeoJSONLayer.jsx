// src/components/GeoJSONLayer.jsx
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function GeoJSONLayer({ data, url, nameField = null }) {
  // Define custom icons
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
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    Secondary: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    Combined: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  };

  // Styling + popups
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      if (url?.includes("Public_Ordinary_Schools")) {
        const {
          NAME,
          SCHOOLTYPE,
          EDUCATIONDISTRICT,
          CIRCUIT,
          SECTOR,
          CONTROL,
          EMIS,
          MEDIUMOFINSTRUCTION,
          SCHOOL_STATUS,
        } = feature.properties;
        layer.bindPopup(`
          <div>
            <strong>${NAME || "Unknown"}</strong><br/>
            <em>${SCHOOLTYPE || "N/A"}</em><br/>
            District: ${EDUCATIONDISTRICT || "N/A"}<br/>
            Circuit: ${CIRCUIT || "N/A"}<br/>
            Medium: ${MEDIUMOFINSTRUCTION || "N/A"}<br/>
            Sector: ${SECTOR || "N/A"}<br/>
            Control: ${CONTROL || "N/A"}<br/>
            Status: ${SCHOOL_STATUS || "N/A"}<br/>
            EMIS: ${EMIS || "N/A"}
          </div>
        `);
      } else if (url?.includes("hospitals")) {
        const { NAME, CLASSIFICATION, TELNO, TOWN, STATUS, EMAIL } =
          feature.properties;
        layer.bindPopup(`
          <div>
            <strong>${NAME || "Hospital"}</strong><br/>
            ${CLASSIFICATION || ""}<br/>
            Tel: ${TELNO || "N/A"}<br/>
            Town: ${TOWN || "N/A"}<br/>
            Status: ${STATUS || "N/A"}<br/>
            Email: ${EMAIL || "N/A"}
          </div>
        `);
      } else {
        const popupContent = nameField
          ? feature.properties[nameField]
          : JSON.stringify(feature.properties, null, 2);
        layer.bindPopup(`<strong>${popupContent}</strong>`);
      }
    }
  };

  const pointToLayer = (feature, latlng) => {
    if (url?.includes("Public_Ordinary_Schools")) {
      const type = feature.properties.SCHOOLTYPE || "";
      if (type.includes("Primary"))
        return L.marker(latlng, { icon: schoolIcons.Primary });
      if (type.includes("Secondary"))
        return L.marker(latlng, { icon: schoolIcons.Secondary });
      if (type.includes("Combined"))
        return L.marker(latlng, { icon: schoolIcons.Combined });
    }
    if (url?.includes("hospitals")) {
      return L.marker(latlng, { icon: hospitalIcon });
    }
    return L.marker(latlng, { icon: new L.Icon.Default() });
  };

  return <GeoJSON data={data} onEachFeature={onEachFeature} pointToLayer={pointToLayer} />;
}

export default GeoJSONLayer;
