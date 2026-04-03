import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import RoomList from "../../components/RoomList";

vi.mock("../../services/api", () => ({
  getRooms: vi.fn().mockResolvedValue([
    { id: 1, roomType: "Single", beds: 1, price: 100, status: "AVAILABLE" }
  ]),
}));

describe("RoomList", () => {

  it("renders rooms list correctly", async () => {
    render(<RoomList />);

    expect(await screen.findByText("Single")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    
    // Avoid duplicate "1"
    const roomIds = screen.getAllByText("1");
    expect(roomIds.length).toBeGreaterThan(0);
    
    expect(screen.getAllByText("AVAILABLE").length).toBeGreaterThan(0);
  });
});