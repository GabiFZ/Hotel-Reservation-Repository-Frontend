import { useState, useEffect } from "react";
import ManagerRoomManagement from "../components/ManagerRoomManagement";
import ManagerBookingsView from "../components/ManagerBookingsView";
import DashboardStats from "../components/DashboardStats";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("stats");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  if (!token) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
          <p className="text-gray-600">Manage rooms, bookings, and view hotel statistics</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "stats"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              📊 Dashboard Stats
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "rooms"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              🛏️ Room Management
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "bookings"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              📋 Bookings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {activeTab === "stats" && <DashboardStats />}
          {activeTab === "rooms" && <ManagerRoomManagement token={token} />}
          {activeTab === "bookings" && <ManagerBookingsView token={token} />}
        </div>
      </div>
    </div>
  );
}