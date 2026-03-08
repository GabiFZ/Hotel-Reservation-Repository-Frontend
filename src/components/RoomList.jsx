import { useEffect, useState } from "react";
import { getRooms, deleteRoom } from "../services/api";

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const loadRooms = () => {
        setLoading(true);
        getRooms()
            .then((data) => { setRooms(data); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            await deleteRoom(id);
            loadRooms();
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        loadRooms();
    }, []);

    if (loading) return <p>Loading rooms...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <table border="1">
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
                        <td>{room.price}</td>
                        <td>{room.status}</td>
                        <td>
                            <button onClick={() => handleDelete(room.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}