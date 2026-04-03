import { useState, useEffect } from "react";
import { addRoom, updateRoom } from "../services/api";
import { Form, Button, Card, Alert } from "react-bootstrap";

function RoomForm({ existingRoom, onSuccess }) {

    const [roomType, setRoomType] = useState("");
    const [beds, setBeds] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("AVAILABLE");
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

        } catch {
            setMessage("Error saving room");
            setError(true);
        }
    };

    return (

        <Card className="mb-4 shadow">
            <Card.Body>

                <Card.Title>
                    {existingRoom ? "Edit Room" : "Add Room"}
                </Card.Title>

                {message && (
                    <Alert variant={error ? "danger" : "success"}>
                        {message}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="roomType">Room Type</label>
                        <input
                        id="roomType"
                        name="roomType"
                        type="text"
                        value={roomType}
                        onChange={e => setRoomType(e.target.value)}
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="beds">Beds</label>
                        <input
                        id="beds"
                        name="beds"
                        type="number"
                        value={beds}
                        onChange={e => setBeds(Number(e.target.value))}
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                        id="price"
                        name="price"
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="status">Status</label>
                        <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                        >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="OCCUPIED">OCCUPIED</option>
                        </select>
                    </div>

                    <button type="submit">Create Room</button>
                    </form>

            </Card.Body>
        </Card>

    );
}

export default RoomForm;