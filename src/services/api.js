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