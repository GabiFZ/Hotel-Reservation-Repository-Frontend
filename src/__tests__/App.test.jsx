import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {

  it('renders main heading', () => {
    render(<App />)
    expect(
        screen.getByText(/Hotel Reservation System/i)
    ).toBeInTheDocument()
  })

  it('button increments counter', async () => {
    render(<App />)

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(button).toHaveTextContent('count is 1')
  })

})