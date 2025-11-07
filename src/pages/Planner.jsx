import { useState, useEffect } from "react";
import { getSchools } from "../services/dataService";
import SchoolTable from "../components/SchoolTable";
import MapView from "../components/MapView";

function Planner() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [phase, setPhase] = useState("All");
  const [utilisation, setUtilisation] = useState("All");
  const [municipality, setMunicipality] = useState("All");
  const [search, setSearch] = useState("");

  // Simulate async data fetch
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const data = getSchools(); // Replace with real API call later
        setSchools(data);
      } catch (err) {
        setError("Failed to fetch schools. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate 1s network delay

    return () => clearTimeout(timer);
  }, []);

  // Apply filters
  const filteredSchools = schools.filter((school) => {
    const phaseMatch = phase === "All" || school.phase === phase;
    const utilisationMatch =
      utilisation === "All" ||
      (utilisation === "Under 80%" && school.utilisation < 80) ||
      (utilisation === "80-95%" &&
        school.utilisation >= 80 &&
        school.utilisation <= 95) ||
      (utilisation === "95-110%" &&
        school.utilisation >= 95 &&
        school.utilisation <= 110) ||
      (utilisation === "Over 110%" && school.utilisation > 110);

    const municipalityMatch =
      municipality === "All" || school.municipality === municipality;

    const searchMatch = school.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return phaseMatch && utilisationMatch && municipalityMatch && searchMatch;
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Planner Dashboard
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search school..."
          className="border rounded px-3 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
        >
          <option>All</option>
          <option>Primary</option>
          <option>Secondary</option>
          <option>Combined</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={utilisation}
          onChange={(e) => setUtilisation(e.target.value)}
        >
          <option>All</option>
          <option>Under 80%</option>
          <option>80-95%</option>
          <option>95-110%</option>
          <option>Over 110%</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
        >
          <option>All</option>
          {[...new Set(schools.map((s) => s.municipality))].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>Loading schools...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredSchools.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-10 text-center text-gray-500">
          <h3 className="text-xl font-semibold mb-2">No schools found</h3>
          <p>
            Try adjusting your search or filter criteria to find schools in this
            area.
          </p>
        </div>
      )}

      {/* Data */}
      {!loading && !error && filteredSchools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SchoolTable schools={filteredSchools} />
          <MapView schools={filteredSchools} />
        </div>
      )}
    </div>
  );
}

export default Planner;
