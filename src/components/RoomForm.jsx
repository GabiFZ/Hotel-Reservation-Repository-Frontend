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

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Beds</Form.Label>
                        <Form.Control
                            type="number"
                            value={beds}
                            onChange={(e) => setBeds(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="OCCUPIED">OCCUPIED</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {existingRoom ? "Update Room" : "Create Room"}
                    </Button>

                    {existingRoom && (
                        <Button
                            variant="secondary"
                            className="ms-2"
                            onClick={() => onSuccess()}
                        >
                            Cancel
                        </Button>
                    )}

                </Form>

            </Card.Body>
        </Card>

    );
}

export default RoomForm;