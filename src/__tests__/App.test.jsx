import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

//Before launching this frontend service and the tests install react-boostrap library:
//npm install react-bootstrap bootstrap

vi.mock('../services/api', () => ({
  getRooms: vi.fn(() => Promise.resolve([])),
  deleteRoom: vi.fn(),
  createRoom: vi.fn(),
  updateRoom: vi.fn()
}))

describe('App Component', () => {

  it('renders page heading', () => {
    render(<App />)

    expect(
      screen.getByText(/Hotel Reservation System/i)
    ).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: /View Rooms/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Add Room/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Bookings/i })
    ).toBeInTheDocument()
  })

})