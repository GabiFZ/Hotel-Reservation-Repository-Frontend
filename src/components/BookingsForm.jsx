import { useState } from 'react';

export default function BookingsForm({ rooms = [], onSubmit }) {
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ roomId, checkInDate, checkOutDate });
    setRoomId('');
    setCheckInDate('');
    setCheckOutDate('');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Booking</h2>
      <form className="bg-white p-6 rounded-lg shadow mb-10 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomId" className="block font-medium mb-1">
            Room
          </label>
          <select
            id="roomId"
            name="roomId"
            className="w-full border p-3 rounded"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomType} - {room.beds} beds - ${room.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkInDate" className="block font-medium mb-1">
              Check-in Date
            </label>
            <input
              id="checkInDate"
              name="checkInDate"
              type="date"
              className="w-full border p-3 rounded"
              required
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="checkOutDate" className="block font-medium mb-1">
              Check-out Date
            </label>
            <input
              id="checkOutDate"
              name="checkOutDate"
              type="date"
              className="w-full border p-3 rounded"
              required
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          type="submit"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}