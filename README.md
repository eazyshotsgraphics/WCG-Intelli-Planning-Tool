# WCG Intelli-Planning Tool

Interactive React + Leaflet tool for planning and analysis across Western Cape datasets (schools, hospitals, broadband, etc.).  
Built with **Vite**, **React**, **Tailwind CSS**, and **react-leaflet**.

## ✨ Features
- Interactive map with **separate clustering** for Schools and Hospitals
- Custom marker **icons** and rich **popups**
- Toggleable **LayersControl** (Hospitals, Schools)
- **Legend** control with icon previews
- Tailwind-powered UI and clean layout
- Ready to plug into real data sources later (currently uses public GeoJSONs)

## 🧱 Tech Stack
- React 18 + Vite
- Tailwind CSS
- Leaflet + react-leaflet
- (Optional) Heatmap / analytics via custom layers

## 📦 Project Structure
intelli-planner/
├─ public/
│ ├─ hospitals.geojson
│ ├─ Public_Ordinary_Schools.geojson
│ └─ Western_Cape_Government_Broadband_Sites.geojson (optional)
├─ src/
│ ├─ components/
│ │ ├─ GeoJSONLayer.jsx
│ │ ├─ HeatmapLayer.jsx
│ │ ├─ Legend.jsx
│ │ ├─ MapView.jsx
│ │ ├─ MarkersFromGeoJSON.jsx
│ │ ├─ Navbar.jsx
│ │ ├─ SchoolTable.jsx
│ │ ├─ StatsCard.jsx
│ │ └─ StatsPanel.jsx
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ Planner.jsx
│ │ └─ Stats.jsx
│ ├─ services/
│ │ └─ dataService.js
│ ├─ App.jsx
│ ├─ index.css
│ └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
