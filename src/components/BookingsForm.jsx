import { useEffect, useState } from "react"
import { getBookings, createBooking, updateBooking, deleteBooking, getRooms } from "../services/api"

export default function BookingsPage() {

  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const [message, setMessage] = useState("")
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    price: ""
  })

  useEffect(() => {
    loadBookings()
    loadRooms()
  }, [])

  async function loadBookings() {
    const data = await getBookings()
    setBookings(data)
  }

  async function loadRooms() {
    const data = await getRooms()
    setRooms(data)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.checkInDate >= form.checkOutDate) {
      setMessage("Check-out must be after check-in")
      return
    }

    const booking = {
      user: { id: 1 },
      room: { id: Number(form.roomId) },
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate
    }

    try {
      await createBooking(booking)
      setMessage("Booking created successfully")

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        price: ""
      })

      loadBookings()

    } catch {
      setMessage("Operation failed")
    }
  }

  function handleEdit(booking) {

    setForm({
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        roomId: booking.room?.id || "",
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        price: booking.price
    })

    setEditingId(booking.id)
  }

  async function handleCancel(id) {
    try {
      await deleteBooking(id)
      setMessage("Booking cancelled")
      loadBookings()
    } catch {
      setMessage("Failed to cancel booking")
    }
  }

  return (
    <div>

      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <select name="roomId" onChange={handleChange}>
          <option value="">Select Room</option>
          {rooms.map(r => (
            <option key={r.id} value={r.id}>
              Room {r.id} - {r.type}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="checkInDate"
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkOutDate"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
        />

        <button type="submit">
            {editingId ? "Update Booking" : "Create Booking"}
        </button>

      </form>

      {message && <p>{message}</p>}

      <h2>Current Bookings</h2>

      <ul>
        {bookings.map(b => (
            <li key={b.id}>
            {b.firstName} {b.lastName} | Room {b.room?.id} |
            {b.checkInDate} → {b.checkOutDate}

            <button onClick={() => handleEdit(b)}>
                Edit
            </button>

            <button onClick={() => handleCancel(b.id)}>
                Cancel
            </button>
            </li>
        ))}
      </ul>

    </div>
  )
}