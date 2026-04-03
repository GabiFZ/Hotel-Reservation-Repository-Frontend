import { useState } from "react";
import RoomsPage from "./pages/RoomsPage";
import AddRoomPage from "./pages/AddRoomPage";
import BookingsForm from "./components/BookingsForm";
import AvailabilityPage from "./pages/AvailabilityPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ManagerDashboard from "./pages/ManagerDashboard";

export default function App() {
  const [page, setPage] = useState("rooms");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // <--- get role

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // <--- clear role
    window.location.reload();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hotel Reservation System</h1>

          <nav className="flex gap-3">
            {!token && (
              <>
                <button onClick={() => setPage("login")} className="border px-4 py-2 rounded">
                  Login
                </button>
                <button onClick={() => setPage("register")} className="border px-4 py-2 rounded">
                  Register
                </button>
              </>
            )}
            {token && role === "MANAGER" && (
              <button onClick={() => setPage("manager")} className="border px-4 py-2 rounded">
                Manager Dashboard
              </button>
            )}
            {token && (
              <button onClick={handleLogout} className="border px-4 py-2 rounded text-red-600">
                Logout
              </button>
            )}
          </nav>
        </header>

        <div className="flex gap-4 mb-6 flex-wrap">
          <button onClick={() => setPage("rooms")} className="border px-4 py-2 rounded">View Rooms</button>
          <button onClick={() => setPage("add")} className="border px-4 py-2 rounded">Add Room</button>
          <button onClick={() => setPage("bookings")} className="border px-4 py-2 rounded">Bookings</button>
          <button onClick={() => setPage("availability")} className="border px-4 py-2 rounded">Availability</button>
        </div>

        <div>
          {page === "rooms" && <RoomsPage />}
          {page === "add" && <AddRoomPage />}
          {page === "bookings" && <BookingsForm />}
          {page === "availability" && <AvailabilityPage />}
          {page === "manager" && role === "MANAGER" && <ManagerDashboard />}
          {page === "login" && <LoginPage />}
          {page === "register" && <RegistrationPage />}
        </div>
      </div>
    </div>
  );
}