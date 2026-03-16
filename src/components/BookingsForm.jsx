import { useEffect, useState } from "react";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getRooms,
} from "../services/api";

export default function BookingsForm() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {
    loadBookings();
    loadRooms();
  }, []);

  async function loadBookings() {
    try {
      const data = await getBookings()
      setBookings(data)
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  async function loadRooms() {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError("Failed to load rooms");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.checkInDate >= form.checkOutDate) {
      setError("Check-out date must be after check-in date");
      return;
    }

    if (!form.roomId) {
      setError("Please select a room");
      return;
    }

    const booking = {
      user: { id: 1 },
      room: { id: Number(form.roomId) },
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
    };

    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (editingId) {
        await updateBooking(editingId, booking);
        setMessage("Booking updated successfully");
      } else {
        await createBooking(booking);
        setMessage("Booking created successfully");
      }

      setForm({
        name: "",
        email: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
      });
      setEditingId(null);
      loadBookings();
    } catch (err) {
      setError("Operation failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(booking) {
    setForm({
      name: booking.user?.name || "",
      email: booking.user?.email || "",
      roomId: booking.room?.id || "",
      checkInDate: booking.checkInDate || "",
      checkOutDate: booking.checkOutDate || "",
    });
    setEditingId(booking.id);
    setMessage("");
    setError("");
  }

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setLoading(true);
      await deleteBooking(id);
      setMessage("Booking cancelled successfully");
      loadBookings();
    } catch (err) {
      setError("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Booking" : "Create New Booking"}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-10">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Guest Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Guest Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="roomId" className="block mb-1 font-medium">
            Room
          </label>
          <select
            id="roomId"
            name="roomId"
            value={form.roomId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                Room {r.id} - {r.roomType} ({r.beds} bed{r.beds > 1 ? "s" : ""})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkInDate" className="block mb-1 font-medium">
              Check-in Date
            </label>
            <input
              id="checkInDate"
              name="checkInDate"
              type="date"
              value={form.checkInDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="checkOutDate" className="block mb-1 font-medium">
              Check-out Date
            </label>
            <input
              id="checkOutDate"
              name="checkOutDate"
              type="date"
              value={form.checkOutDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-white font-medium ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Processing..."
            : editingId
            ? "Update Booking"
            : "Create Booking"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                email: "",
                roomId: "",
                checkInDate: "",
                checkOutDate: "",
              });
              setMessage("");
              setError("");
            }}
            className="ml-4 px-6 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancel Edit
          </button>
        )}
      </form>
      {message && (
        <p className="text-red-500">{message}</p>
      )}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-blue-600">Loading...</p>}

      <h2 className="text-2xl font-bold mb-4">Current Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="font-medium">
                Guest: {b.user?.name || "Unknown Guest"}
              </div>
              <div>
                Email: {b.user?.email || "—"}
              </div>
              <div>
                Room: {b.room?.id} - {b.room?.roomType || "Unknown"} (
                {b.room?.beds} bed{b.room?.beds > 1 ? "s" : ""})
              </div>
              <div>
                Dates: {b.checkInDate} → {b.checkOutDate}
              </div>
              <div className="mt-1">
                Status: <span className="font-semibold">{b.status || "Unknown"}</span>
              </div>

              <div className="mt-3 space-x-3">
                <button
                  onClick={() => handleEdit(b)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(b.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}