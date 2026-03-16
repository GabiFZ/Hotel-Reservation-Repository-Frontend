// Pick base URL based on runtime environment
const isDev = import.meta.env.MODE === 'development';

export const BASE_URL = isDev 
  ? 'http://localhost:8080'   
  : '/api';                      

export async function getRooms() {
  const res = await fetch(`${BASE_URL}/rooms`)
  if (!res.ok) throw new Error("Failed to fetch rooms")
  return res.json()
}

export async function addRoom(room) {
  const res = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(room)
  })

  if (!res.ok) throw new Error("Failed to add room")

  return res.json()
}

export async function updateRoom(id, room) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(room)
  })

  if (!res.ok) throw new Error("Failed to update room")

  return res.json()
}

export async function deleteRoom(id) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete room");
  return true;
}

export async function getBookings() {
  const res = await fetch(`${BASE_URL}/bookings`)
  if (!res.ok) throw new Error("Failed to fetch bookings")
  return res.json()
}

export async function createBooking(booking) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })

  if (!res.ok) throw new Error("Failed to create booking")

  return res.json()
}

export async function deleteBooking(id) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) throw new Error("Failed to cancel booking")

  return true
}

export async function updateBooking(id, booking) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })

  if (!res.ok) throw new Error("Failed to update booking")

  return res.json()
}

export const getAvailableRooms = async (start, end) => {
  const res = await fetch(`${BASE_URL}/availability?start=${start}&end=${end}`);
  if (!res.ok) {
    const errorText = await res.text(); // better debugging
    console.error("Availability failed:", res.status, errorText);
    throw new Error(`Failed to fetch available rooms: ${res.status} - ${errorText}`);
  }
  return res.json();
};