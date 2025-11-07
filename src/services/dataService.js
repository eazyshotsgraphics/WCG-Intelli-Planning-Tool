// Dummy data for Stats and Planner
export function getStats() {
  return [
    {
      title: "Crime Rate",
      value: "42.3",
      subtitle: "per 100k population",
      detail: "Top hotspots: Khayelitsha, Nyanga, Gugulethu",
      color: "from-red-500 to-red-700",
    },
    {
      title: "Population",
      value: "2.4M",
      subtitle: "847 people/km²",
      detail: "5-year projection: +12.3% growth",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Hospitals",
      value: "47",
      subtitle: "in viewport",
      detail: "Nearest: Mitchells Plain Hospital (2.3 km)",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Broadband",
      value: "73%",
      subtitle: "coverage",
      detail: "Avg speed: 45 Mbps (Fiber: 31%, Mobile: 27%)",
      color: "from-purple-500 to-purple-700",
    },
  ];
}

// Dummy school data for Planner page
export function getSchools() {
  return [
    {
      id: 1,
      name: "Mitchells Plain Secondary",
      phase: "Secondary",
      municipality: "Mitchells Plain",
      capacity: 1200,
      enrolment: 1500,
      utilisation: 125,
      condition: "Good",
      lat: -34.05,
      lng: 18.60,
    },
    {
      id: 2,
      name: "Khayelitsha Primary",
      phase: "Primary",
      municipality: "Khayelitsha",
      capacity: 900,
      enrolment: 870,
      utilisation: 97,
      condition: "Fair",
      lat: -34.04,
      lng: 18.68,
    },
  ];
}


