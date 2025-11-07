import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function Legend() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <h4>Legend</h4>
        <div class="flex items-center mb-1">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" width="14" height="20" />
          <span class="ml-1">Primary School</span>
        </div>
        <div class="flex items-center mb-1">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" width="14" height="20" />
          <span class="ml-1">Secondary School</span>
        </div>
        <div class="flex items-center mb-1">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" width="14" height="20" />
          <span class="ml-1">Combined School</span>
        </div>
        <div class="flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" width="16" height="16" />
          <span class="ml-1">Hospital</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);
    return () => legend.remove();
  }, [map]);

  return null;
}

export default Legend;
