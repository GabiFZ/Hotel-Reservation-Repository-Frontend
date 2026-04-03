import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../../services/api";

global.fetch = vi.fn();

describe("API Service", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("includes Authorization header when token exists", async () => {
    localStorage.setItem("token", "fake-jwt-token");
    fetch.mockResolvedValue({ ok: true, json: async () => [] });

    await api.getRooms();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-jwt-token"
        })
      })
    );
  });

  it("getAvailableRooms works correctly", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, roomType: "Single" }]
    });

    const rooms = await api.getAvailableRooms("2026-04-10", "2026-04-15");
    expect(rooms).toBeDefined();
  });
});