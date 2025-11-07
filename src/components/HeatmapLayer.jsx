import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create heat layer
    const heat = L.heatLayer(points, { radius: 25, blur: 15 }).addTo(map);

    // Cleanup on unmount
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null; // React Leaflet custom layer renders nothing itself
}

export default HeatmapLayer;
