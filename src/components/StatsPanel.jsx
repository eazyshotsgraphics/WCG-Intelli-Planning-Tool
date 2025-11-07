// src/components/StatsPanel.jsx
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import * as turf from "@turf/turf"; // for geo calculations

function StatsPanel({ datasets }) {
  const map = useMap();
  const [stats, setStats] = useState({ schools: 0, hospitals: 0 });

  useEffect(() => {
    if (!map) return;

    const updateStats = () => {
      const bounds = map.getBounds();
      let schoolCount = 0;
      let hospitalCount = 0;

      datasets.forEach((d) => {
        d.features.forEach((f) => {
          if (f.geometry?.type === "Point") {
            const [lng, lat] = f.geometry.coordinates;
            if (bounds.contains([lat, lng])) {
              if (d.type === "school") schoolCount++;
              if (d.type === "hospital") hospitalCount++;
            }
          }
        });
      });

      setStats({ schools: schoolCount, hospitals: hospitalCount });
    };

    updateStats();
    map.on("moveend", updateStats);
    return () => {
      map.off("moveend", updateStats);
    };
  }, [map, datasets]);

  return (
    <div className="absolute top-20 left-4 bg-white shadow-lg rounded-md p-4 text-sm">
      <h3 className="font-bold mb-2">📊 Statistics</h3>
      <p>Schools in view: <strong>{stats.schools}</strong></p>
      <p>Hospitals in view: <strong>{stats.hospitals}</strong></p>
    </div>
  );
}

export default StatsPanel;
