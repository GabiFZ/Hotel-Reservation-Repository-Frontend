// src/services/api.js
const isDev = import.meta.env.MODE === 'development';
export const BASE_URL = isDev ? 'http://localhost:8080/api' : '/api';

// Helper to get token
const getToken = () => localStorage.getItem('token');

// Helper to create headers with Authorization if token exists
const authHeaders = () => {
  const token = getToken();
  return token 
    ? { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

// ====================== AUTH ======================
export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// ====================== ROOMS ======================
export async function getRooms() {
  const res = await fetch(`${BASE_URL}/rooms`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}

export async function addRoom(room) {
  const res = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(room),
  });
  if (!res.ok) throw new Error("Failed to add room");
  return res.json();
}

export async function updateRoom(id, room) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(room),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}

export async function deleteRoom(id) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, { 
    method: "DELETE",
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete room");
  return true;
}

// ====================== BOOKINGS ======================
export async function getBookings() {
  const res = await fetch(`${BASE_URL}/bookings`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function createBooking(bookingRequest) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(bookingRequest),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function updateBooking(id, bookingRequest) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(bookingRequest),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function deleteBooking(id) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, { 
    method: "DELETE",
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete booking");
  return true;
}

// ====================== AVAILABILITY ======================
export async function getAvailableRooms(start, end) {
  const res = await fetch(`${BASE_URL}/availability?start=${start}&end=${end}`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch available rooms");
  return res.json();
}