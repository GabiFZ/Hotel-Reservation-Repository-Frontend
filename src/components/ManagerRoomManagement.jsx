import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { BASE_URL } from "../services/api";

export default function ManagerRoomManagement({ token }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    roomType: "",
    beds: "",
    price: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/manager/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(data);
      setError("");
    } catch (err) {
      setError("Error loading rooms: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomType: room.roomType,
        beds: room.beds,
        price: room.price,
        status: room.status,
      });
    } else {
      setEditingRoom(null);
      setFormData({ roomType: "", beds: "", price: "", status: "AVAILABLE" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
    setFormData({ roomType: "", beds: "", price: "", status: "AVAILABLE" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingRoom
        ? `${BASE_URL}/manager/rooms/${editingRoom.id}`
        : `${BASE_URL}/manager/rooms`;

      const method = editingRoom ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomType: formData.roomType,
          beds: Number(formData.beds),
          price: Number(formData.price),
          status: formData.status,
        }),
      });

      if (!response.ok) throw new Error("Failed to save room");

      setSuccess(editingRoom ? "Room updated successfully" : "Room created successfully");
      handleCloseModal();
      loadRooms();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error saving room: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/manager/rooms/${roomId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete room");

      setSuccess("Room deleted successfully");
      loadRooms();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error deleting room: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Room Management</h2>
        <Button
          variant="success"
          onClick={() => handleOpenModal()}
          disabled={loading}
        >
          ➕ Add New Room
        </Button>
      </div>

      {loading && !rooms.length ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <Table striped bordered hover>
            <thead className="bg-gray-100">
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
                  <td>${room.price.toFixed(2)}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        room.status === "AVAILABLE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleOpenModal(room)}
                      disabled={loading}
                      className="me-2"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(room.id)}
                      disabled={loading}
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? "Edit Room" : "Add New Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                type="text"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                placeholder="e.g., Single, Double, Suite"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Beds</Form.Label>
              <Form.Control
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                min="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price per Night ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
              </Form.Select>
            </Form.Group>

            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}