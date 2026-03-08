import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RoomList from "../../components/RoomList";
import * as api from "../../services/api";

describe("RoomList Component", () => {

    it("shows loading message initially", () => {
        vi.spyOn(api, "fetchRooms").mockResolvedValue([]);

        render(<RoomList />);

        expect(screen.getByText(/Loading rooms/i)).toBeInTheDocument();
    });

    it("renders rooms in table", async () => {

        const mockRooms = [
            { id: 1, roomType: "Single", beds: 1, price: 100, status: "AVAILABLE" }
        ];

        vi.spyOn(api, "fetchRooms").mockResolvedValue(mockRooms);

        render(<RoomList />);

        await waitFor(() =>
            expect(screen.getByText("Single")).toBeInTheDocument()
        );

        expect(screen.getByText("100")).toBeInTheDocument();
    });

});