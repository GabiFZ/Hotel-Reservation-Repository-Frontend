import { useState } from "react";
import { addRoom } from "../services/api";

export default function RoomForm({ onRoomAdded }) {
  const [roomType, setRoomType] = useState("");
  const [beds, setBeds] = useState(1);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("AVAILABLE");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const room = { roomType, beds, price, status };

    try {
      await addRoom(room);
      alert("Room added successfully");

      if (onRoomAdded) onRoomAdded();

      setRoomType("");
      setBeds(1);
      setPrice(0);
      setStatus("AVAILABLE");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Room</h2>

      <input
        placeholder="Room Type"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Beds"
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="OCCUPIED">OCCUPIED</option>
      </select>

      <button type="submit">Add Room</button>
    </form>
  );
}