import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { BASE_URL } from "../services/api";

export default function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/manager/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
      setError("");
    } catch (err) {
      setError("Error loading stats: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  if (error) return <Alert variant="danger" className="m-6">{error}</Alert>;

  if (!stats) return <div className="p-6 text-gray-600">No data available</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Hotel Dashboard Overview</h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Rooms */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-semibold mb-1">Total Rooms</p>
              <p className="text-4xl font-bold">{stats.totalRooms}</p>
            </div>
            <span className="text-4xl">🛏️</span>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-400">
            <p className="text-blue-100 text-xs">All hotel rooms in inventory</p>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm font-semibold mb-1">Available Rooms</p>
              <p className="text-4xl font-bold">{stats.availableRooms}</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
          <div className="mt-4 pt-4 border-t border-green-400">
            <p className="text-green-100 text-xs">Ready for booking</p>
          </div>
        </div>

        {/* Occupied Rooms */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-100 text-sm font-semibold mb-1">Occupied Rooms</p>
              <p className="text-4xl font-bold">{stats.occupiedRooms}</p>
            </div>
            <span className="text-4xl">🔴</span>
          </div>
          <div className="mt-4 pt-4 border-t border-red-400">
            <p className="text-red-100 text-xs">Currently in use</p>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm font-semibold mb-1">Occupancy Rate</p>
              <p className="text-4xl font-bold">{stats.occupancyRate.toFixed(1)}%</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-400">
            <p className="text-purple-100 text-xs">Current capacity utilization</p>
          </div>
        </div>
      </div>

      {/* Bookings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Total Bookings */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-100 text-sm font-semibold mb-1">Total Bookings</p>
              <p className="text-4xl font-bold">{stats.totalBookings}</p>
            </div>
            <span className="text-4xl">📋</span>
          </div>
          <div className="mt-4 pt-4 border-t border-cyan-400">
            <p className="text-cyan-100 text-xs">All time reservations</p>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100 text-sm font-semibold mb-1">Confirmed Bookings</p>
              <p className="text-4xl font-bold">{stats.confirmedBookings}</p>
            </div>
            <span className="text-4xl">✔️</span>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-400">
            <p className="text-amber-100 text-xs">Active reservations</p>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={loadStats}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
        >
          🔄 Refresh Stats
        </button>
      </div>
    </div>
  );
}