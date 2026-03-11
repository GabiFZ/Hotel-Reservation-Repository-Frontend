import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import BookingsForm from "../../components/BookingsForm"
import * as api from "../../services/api"

vi.mock("../../services/api", () => ({
  getBookings: vi.fn().mockResolvedValue([]),
  getRooms: vi.fn().mockResolvedValue([
    { id: 1, type: "Single", beds: 1 }
  ]),
  createBooking: vi.fn().mockResolvedValue({}),
  updateBooking: vi.fn().mockResolvedValue({})
}))

describe("BookingsForm", () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders booking form", async () => {

    render(<BookingsForm />)

    expect(
      await screen.findByRole("heading", { name: /create new booking/i })
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/guest name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/room/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/check-in date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/check-out date/i)).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /create booking/i })
    ).toBeInTheDocument()

  })


  it("validates date range", async () => {

    render(<BookingsForm />)

    await screen.findByText(/room 1/i)

    fireEvent.change(screen.getByLabelText(/guest name/i), {
      target: { value: "John Doe" }
    })

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@email.com" }
    })

    fireEvent.change(screen.getByLabelText(/room/i), {
      target: { value: "1" }
    })

    fireEvent.change(screen.getByLabelText(/check-in date/i), {
      target: { value: "2026-06-10" }
    })

    fireEvent.change(screen.getByLabelText(/check-out date/i), {
      target: { value: "2026-06-05" }
    })

    fireEvent.click(
      screen.getByRole("button", { name: /create booking/i })
    )

    await waitFor(() => {
      expect(
        screen.getByText(/check-out date must be after check-in date/i)
      ).toBeInTheDocument()
    })

  })


  it("submits form when valid", async () => {

    const mockCreate = api.createBooking

    render(<BookingsForm />)

    await screen.findByText(/room 1/i)

    fireEvent.change(screen.getByLabelText(/guest name/i), {
      target: { value: "Jane Smith" }
    })

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane@email.com" }
    })

    fireEvent.change(screen.getByLabelText(/room/i), {
      target: { value: "1" }
    })

    fireEvent.change(screen.getByLabelText(/check-in date/i), {
      target: { value: "2026-06-15" }
    })

    fireEvent.change(screen.getByLabelText(/check-out date/i), {
      target: { value: "2026-06-20" }
    })

    fireEvent.click(
      screen.getByRole("button", { name: /create booking/i })
    )

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledTimes(1)
    })

  })

})