import { useState, useEffect } from "react";
import { getStats } from "../services/dataService";
import StatsCard from "../components/StatsCard";

function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate async fetch
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const data = getStats(); // Replace with real API later
        setStats(data);
      } catch (err) {
        setError("Failed to fetch statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📈 Statistics</h2>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>Loading statistics...</p>
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
      {!loading && !error && stats.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-10 text-center text-gray-500">
          <h3 className="text-xl font-semibold mb-2">No statistics available</h3>
          <p>Data could not be found for this view.</p>
        </div>
      )}

      {/* Data */}
      {!loading && !error && stats.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
