import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import RoomList from "../../components/RoomList"

vi.mock("../../services/api", () => ({
  getRooms: vi.fn().mockResolvedValue([
    { id: 1, roomType: "Single", beds: 1, price: 100, status: "AVAILABLE" }
  ]),
  deleteRoom: vi.fn()
}))

describe("RoomList", () => {

  it("renders room list", async () => {

    render(<RoomList />)

    expect(await screen.findByText("Single")).toBeInTheDocument()

  })

})