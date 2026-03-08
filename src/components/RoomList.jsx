import { useEffect, useState } from "react";
import { fetchRooms } from "../services/api";

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRooms()
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
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
                </tr>
            ))}
            </tbody>
        </table>
    );
}