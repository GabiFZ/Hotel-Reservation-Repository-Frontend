import { useEffect, useState } from "react";
import { getRooms, deleteRoom } from "../services/api";
import RoomForm from "./RoomForm";
import { Table, Button, Badge, Card } from "react-bootstrap";

export default function RoomList() {

    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);

    const loadRooms = () => {
        getRooms().then(setRooms);
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this room?")) return;

        await deleteRoom(id);
        loadRooms();
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
    };

    const handleSuccess = () => {
        setEditingRoom(null);
        loadRooms();
    };

    return (

        <div>

            <RoomForm
                existingRoom={editingRoom}
                onSuccess={handleSuccess}
            />

            <Card className="shadow">

                <Card.Body>

                    <Card.Title>Rooms List</Card.Title>

                    <Table striped bordered hover>

                        <thead>

                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Beds</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                        </thead>

                        <tbody>

                        {rooms.map((room) => (

                            <tr key={room.id}>

                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.beds}</td>
                                <td>${room.price}</td>

                                <td>
                                    <Badge bg={room.status === "AVAILABLE" ? "success" : "danger"}>
                                        {room.status}
                                    </Badge>
                                </td>

                                <td>

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(room)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => handleDelete(room.id)}
                                    >
                                        Delete
                                    </Button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

        </div>
    );
}