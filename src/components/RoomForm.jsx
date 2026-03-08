import { useState } from "react";

function RoomForm({ existingRoom, onSuccess }) {
    const [roomType, setRoomType] = useState(existingRoom?.roomType || "");
    const [beds, setBeds] = useState(existingRoom?.beds || "");
    const [price, setPrice] = useState(existingRoom?.price || "");
    const [message, setMessage] = useState(""); // mesaj de feedback
    const [error, setError] = useState(false);  // true dacă e eroare

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validare simplă
        if (!roomType || !beds || !price) {
            setMessage("All fields are required");
            setError(true);
            return;
        }

        const room = { roomType, beds: Number(beds), price: Number(price), status: "AVAILABLE" };

        try {
            const url = existingRoom
                ? `http://localhost:8080/rooms/${existingRoom.id}`
                : "http://localhost:8080/rooms";

            const method = existingRoom ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(room),
            });

            if (!response.ok) throw new Error("Request failed");

            setMessage(existingRoom ? "Room updated successfully" : "Room created successfully");
            setError(false);

            // resetează câmpurile dacă e creare
            if (!existingRoom) {
                setRoomType("");
                setBeds("");
                setPrice("");
            }

            // Notifică lista de camere să reîncarce
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
                <button type="submit">{existingRoom ? "Update Room" : "Create Room"}</button>
            </form>

            {/* Afișează mesajul de feedback */}
            {message && (
                <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>{message}</p>
            )}
        </div>
    );
}

export default RoomForm;