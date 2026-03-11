import { describe, it, expect, vi, beforeEach } from "vitest"
import * as api from "../../services/api"

global.fetch = vi.fn()

describe("API Service", () => {

  beforeEach(() => {
    fetch.mockReset()
  })

  it("getRooms returns data", async () => {

    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, roomType: "Single" }]
    })

    const rooms = await api.getRooms()

    expect(fetch).toHaveBeenCalled()
    expect(rooms[0].roomType).toBe("Single")
  })

  it("getRooms throws error on failure", async () => {

    fetch.mockResolvedValue({ ok: false })

    await expect(api.getRooms()).rejects.toThrow()
  })

  it("addRoom sends POST request", async () => {

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 })
    })

    await api.addRoom({ roomType: "Single" })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/rooms"),
      expect.objectContaining({
        method: "POST"
      })
    )

  })

})