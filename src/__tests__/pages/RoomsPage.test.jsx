import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import RoomsPage from "../../pages/RoomsPage"

vi.mock("../../services/api", () => ({
  getRooms: vi.fn().mockResolvedValue([
    { id: 1, roomType: "Single", beds: 1, price: 100, status: "AVAILABLE" }
  ]),
  deleteRoom: vi.fn()
}))

describe("RoomsPage", () => {

  it("renders page title", () => {

    render(<RoomsPage />)

    expect(screen.getByText("Rooms")).toBeInTheDocument()

  })

})