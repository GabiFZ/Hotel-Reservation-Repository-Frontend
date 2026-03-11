// src/components/RoomCard.jsx
import React from "react";

const RoomCard = ({ room }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{room.roomType}</h3>
      <p>Beds: {room.beds}</p>
      <p>Price: ${room.price}</p>
      <p>Status: {room.status}</p>
    </div>
  );
};

export default RoomCard;