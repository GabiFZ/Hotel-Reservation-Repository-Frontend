import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import RoomForm from "../../components/RoomForm";
import * as api from "../../services/api";

vi.mock("../../services/api", () => ({
  addRoom: vi.fn().mockResolvedValue({ id: 1 }),
}));

describe("RoomForm", () => {

  it("renders form fields correctly", () => {
    render(<RoomForm />);
    expect(screen.getByText(/Add Room/i)).toBeInTheDocument();
  });

  it("calls addRoom on submit with correct data", async () => {
    const mockAddRoom = vi.mocked(api.addRoom);

    render(<RoomForm />);

    fireEvent.change(screen.getByLabelText(/Room Type/i), { target: { value: "Deluxe" } });
    fireEvent.change(screen.getByLabelText(/Beds/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: "120" } });

    fireEvent.click(screen.getByRole("button", { name: /Create Room/i }));

    await waitFor(() => {
      expect(mockAddRoom).toHaveBeenCalledWith({
        roomType: "Deluxe",
        beds: 2,
        price: 120,
        status: "AVAILABLE"
      });
    });
  });
});