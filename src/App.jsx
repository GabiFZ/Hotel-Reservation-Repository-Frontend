import { useState } from "react";
import RoomsPage from "./pages/RoomsPage";
import AddRoomPage from "./pages/AddRoomPage";
import BookingsForm from "./components/BookingsForm";

export default function App() {
  const [page, setPage] = useState("rooms");

  return (
    <div>
      <h1>Hotel Reservation System</h1>

      <nav>
        <button onClick={() => setPage("rooms")}>View Rooms</button>
        <button onClick={() => setPage("add")}>Add Room</button>
        <button onClick={() => setPage("bookings")}>Bookings</button>
      </nav>

      {page === "bookings" && <BookingsForm />}
      {page === "rooms" && <RoomsPage />}
      {page === "add" && <AddRoomPage />}
    </div>
  );
}