import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {

  it('renders page heading', () => {
    render(<App />)

    expect(
      screen.getByText(/Hotel Reservation System/i)
    ).toBeInTheDocument()
  })

  it('shows loading message initially', () => {
    render(<App />)

    expect(
      screen.getByText(/Loading rooms/i)
    ).toBeInTheDocument()
  })

})