import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Stats from "./pages/Stats";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/stats" element={<Stats />} />  {/* 👈 new */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-4 bg-gray-200 text-center text-sm text-gray-600">
          Intelli Planner © {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}

export default App;
