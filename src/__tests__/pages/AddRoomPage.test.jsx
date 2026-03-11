import { render, screen } from "@testing-library/react"
import AddRoomPage from "../../pages/AddRoomPage"

describe("AddRoomPage", () => {

  it("renders add room page", () => {

    render(<AddRoomPage />)

    expect(screen.getByText("Add New Room")).toBeInTheDocument()

  })

})