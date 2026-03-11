import { useState } from "react";
import RoomsPage from "./pages/RoomsPage";
import AddRoomPage from "./pages/AddRoomPage";
import BookingsForm from "./components/BookingsForm";
import AvailabilityPage from "./pages/AvailabilityPage";

export default function App() {
  const [page, setPage] = useState("rooms");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hotel Reservation System</h1>

      <nav className="flex gap-4 mb-6">
        <button onClick={() => setPage("rooms")} className="border px-4 py-2 rounded">
          View Rooms
        </button>
        <button onClick={() => setPage("add")} className="border px-4 py-2 rounded">
          Add Room
        </button>
        <button onClick={() => setPage("bookings")} className="border px-4 py-2 rounded">
          Bookings
        </button>
        <button onClick={() => setPage("availability")} className="border px-4 py-2 rounded">
          Availability
        </button>
      </nav>

      <div>
        {page === "rooms" && <RoomsPage />}
        {page === "add" && <AddRoomPage />}
        {page === "bookings" && <BookingsForm />}
        {page === "availability" && <AvailabilityPage />}
      </div>
    </div>
  );
}
