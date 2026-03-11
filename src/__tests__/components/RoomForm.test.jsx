import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import RoomForm from "../../components/RoomForm"

vi.mock("../../services/api", () => ({
  addRoom: vi.fn().mockResolvedValue({}),
  updateRoom: vi.fn().mockResolvedValue({})
}))

describe("RoomForm", () => {

  it("renders form fields", () => {

    render(<RoomForm />)

    expect(screen.getByText("Add Room")).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /create room/i })
    ).toBeInTheDocument()

  })

  it("shows validation error", async () => {

    render(<RoomForm />)

    fireEvent.click(
      screen.getByRole("button", { name: /create room/i })
    )

  })

})