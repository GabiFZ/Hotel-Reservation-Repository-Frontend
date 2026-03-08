
import { useState, useEffect } from "react";
import { addRoom, updateRoom } from "../services/api";

function RoomForm({ existingRoom, onSuccess }) {
    const [roomType, setRoomType] = useState("");
    const [beds, setBeds] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("AVAILABLE"); // status select
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


    useEffect(() => {
        if (existingRoom) {
            setRoomType(existingRoom.roomType);
            setBeds(existingRoom.beds);
            setPrice(existingRoom.price);
            setStatus(existingRoom.status);
        } else {
            setRoomType("");
            setBeds("");
            setPrice("");
            setStatus("AVAILABLE");
        }
    }, [existingRoom]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roomType || !beds || !price) {
            setMessage("All fields are required");
            setError(true);
            return;
        }

        const room = {
            roomType,
            beds: Number(beds),
            price: Number(price),
            status
        };

        try {
            if (existingRoom) {
                await updateRoom(existingRoom.id, room);
            } else {
                await addRoom(room);
            }

            setMessage(existingRoom ? "Room updated successfully" : "Room created successfully");
            setError(false);

            if (!existingRoom) {
                setRoomType("");
                setBeds("");
                setPrice("");
                setStatus("AVAILABLE");
            }

            if (onSuccess) onSuccess();

        } catch (err) {
            setMessage("Error saving room");
            setError(true);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <h2>{existingRoom ? "Edit Room" : "Add Room"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Room Type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
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

                <button type="submit">
                    {existingRoom ? "Update Room" : "Create Room"}
                </button>

                {existingRoom && (
                    <button
                        type="button"
                        onClick={() => onSuccess()} // resetează form
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {message && (
                <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default RoomForm;