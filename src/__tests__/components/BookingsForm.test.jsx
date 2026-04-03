// src/__tests__/components/BookingsForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import BookingsForm from '../../components/BookingsForm.jsx';

describe('BookingsForm', () => {
  const mockRooms = [
    { id: 1, roomType: 'Single', beds: 1, price: 100 },
    { id: 2, roomType: 'Double', beds: 2, price: 150 },
  ];

  const mockOnSubmit = vi.fn();

  test('renders booking form', () => {
    render(<BookingsForm rooms={mockRooms} onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/Create New Booking/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Room/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Check-in Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Check-out Date/i)).toBeInTheDocument();
  });

  test('submits correct booking data', async () => {
    render(<BookingsForm rooms={mockRooms} onSubmit={mockOnSubmit} />);

    // Wait for options to render
    const singleOption = await screen.findByText(/Single/);
    expect(singleOption).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Check-in Date/i), {
      target: { value: '2026-06-15' },
    });
    fireEvent.change(screen.getByLabelText(/Check-out Date/i), {
      target: { value: '2026-06-18' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create Booking/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      roomId: '1',
      checkInDate: '2026-06-15',
      checkOutDate: '2026-06-18',
    });
  });
});