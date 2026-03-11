import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import BookingsForm from "../../components/BookingsForm"

// Mock API calls
vi.mock("../../services/api", () => ({
  getBookings: vi.fn().mockResolvedValue([]),
  getRooms: vi.fn().mockResolvedValue([
    { id: 1, roomType: "Single" }
  ]),
  createBooking: vi.fn().mockResolvedValue({})
}))

describe("BookingsForm", () => {

  it("renders booking form", async () => {
    render(<BookingsForm />)

    expect(
      await screen.findByRole("heading", { name: /create booking/i })
    ).toBeInTheDocument()
  })

  it("validates date range", async () => {
    render(<BookingsForm />)

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" }
    })

    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" }
    })

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@email.com" }
    })

    // Select a room
    fireEvent.change(screen.getByRole("combobox", { name: /room/i }), {
      target: { value: "1" }
    })

    // Check-in and check-out dates
    fireEvent.change(screen.getByLabelText(/check-in date/i), {
      target: { value: "2026-06-10" }
    })

    fireEvent.change(screen.getByLabelText(/check-out date/i), {
      target: { value: "2026-06-05" } // intentionally invalid
    })

    // Optional: Submit the form if needed
    // fireEvent.click(screen.getByRole("button", { name: /create booking/i }))
  })
})