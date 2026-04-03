import { useEffect, useState } from "react";
import { Table, Form, Alert, Badge } from "react-bootstrap";
import { BASE_URL } from "../services/api";

export default function ManagerBookingsView({ token }) {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filterStatus, filterStartDate, filterEndDate]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/manager/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
      setError("");
    } catch (err) {
      setError("Error loading bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = bookings;

    // Filter by status
    if (filterStatus !== "ALL") {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    // Filter by date range
    if (filterStartDate) {
      filtered = filtered.filter((b) => b.checkInDate >= filterStartDate);
    }
    if (filterEndDate) {
      filtered = filtered.filter((b) => b.checkOutDate <= filterEndDate);
    }

    setFilteredBookings(filtered);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge bg="success">Confirmed</Badge>;
      case "CANCELLED":
        return <Badge bg="danger">Cancelled</Badge>;
      case "COMPLETED":
        return <Badge bg="secondary">Completed</Badge>;
      default:
        return <Badge bg="info">{status}</Badge>;
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Booking Management</h2>

        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Form.Group>
              <Form.Label className="font-semibold">Status</Form.Label>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-semibold">Check-in From</Form.Label>
              <Form.Control
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-semibold">Check-out To</Form.Label>
              <Form.Control
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </Form.Group>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus("ALL");
                  setFilterStartDate("");
                  setFilterEndDate("");
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm font-semibold">Total Bookings</p>
          <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm font-semibold">Confirmed</p>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "CONFIRMED").length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-gray-600 text-sm font-semibold">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">
            {bookings.filter((b) => b.status === "CANCELLED").length}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <Table striped bordered hover>
            <thead className="bg-gray-100">
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Guest Email</th>
                <th>Room ID</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="font-semibold">#{booking.id}</td>
                    <td>{booking.user?.name || "N/A"}</td>
                    <td>{booking.user?.email || "N/A"}</td>
                    <td>{booking.room?.id || "N/A"}</td>
                    <td>{formatDate(booking.checkInDate)}</td>
                    <td>{formatDate(booking.checkOutDate)}</td>
                    <td className="font-semibold">{calculateNights(booking.checkInDate, booking.checkOutDate)}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}