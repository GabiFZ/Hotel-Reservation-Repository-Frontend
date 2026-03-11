import React, { useState, useEffect } from "react";
import { getAvailableRooms } from "../services/api";
import RoomCard from "../components/RoomCard";

const AvailabilityPage = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [bedsFilter, setBedsFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!checkInDate || !checkOutDate) return;

      try {
        const data = await getAvailableRooms(checkInDate, checkOutDate);
        setRooms(data);
        setFilteredRooms(data); 
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    fetchRooms();
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    let result = [...rooms];
    if (roomTypeFilter) {
      result = result.filter(r => r.roomType === roomTypeFilter);
    }
    if (bedsFilter) {
      result = result.filter(r => r.beds === parseInt(bedsFilter));
    }
    setFilteredRooms(result);
  }, [roomTypeFilter, bedsFilter, rooms]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Check Room Availability</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={roomTypeFilter}
          onChange={(e) => setRoomTypeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>

        <select
          value={bedsFilter}
          onChange={(e) => setBedsFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Beds</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3 Beds</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRooms.length === 0 ? (
          <p>No rooms available for the selected dates and filters.</p>
        ) : (
          filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailabilityPage;