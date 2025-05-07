import React, { useState, useEffect, useRef } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import { reservationApi } from '../../api';

// Helper to generate time slots between start and end time with given interval in minutes
function generateTimeSlots(startTime, endTime, intervalMinutes) {
  const slots = [];
  let current = new Date(startTime);
  while (current < endTime) {
    slots.push(new Date(current));
    current = new Date(current.getTime() + intervalMinutes * 60000);
  }
  return slots;
}

// Format date to HH:mm string
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const AvailableSlotsPicker = ({ selectedDate, duration, selectedSlot, onSelect }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevSelectedDate = useRef(null);
  const prevDuration = useRef(null);

  useEffect(() => {
    if (!selectedDate || !duration) {
      setAvailableSlots([]);
      onSelect(null);
      return;
    }

    // Only fetch if selectedDate or duration changed
    if (
      prevSelectedDate.current?.getTime() === selectedDate.getTime() &&
      prevDuration.current === duration
    ) {
      return;
    }
    prevSelectedDate.current = selectedDate;
    prevDuration.current = duration;

    const fetchAvailableSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all reservations for the selected date
        const allReservations = await reservationApi.getReservationsList();

        // Filter reservations for the selected date
        const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1);

        const reservationsForDate = allReservations.filter((res) => {
          const startDate = new Date(res.start_date);
          return startDate >= startOfDay && startDate < endOfDay;
        });

        // Define working hours (e.g., 8:00 to 18:00)
        let workStart = new Date(startOfDay);
        workStart.setHours(8, 0, 0, 0);
        const workEnd = new Date(startOfDay);
        workEnd.setHours(18, 0, 0, 0);

        // If selected date is today, adjust workStart to next available slot (e.g., next 15 min interval)
        const now = new Date();
        if (startOfDay.toDateString() === now.toDateString()) {
          const minutes = now.getMinutes();
          const nextSlotMinutes = minutes % 15 === 0 ? minutes : minutes + (15 - (minutes % 15));
          workStart.setHours(now.getHours(), nextSlotMinutes, 0, 0);
          if (workStart < now) {
            workStart = new Date(now.getTime() + 15 * 60000);
          }
        }

        // Use selected duration or default to 15 minutes
        const slotDuration = duration || 15;

        // Generate all possible slots
        const allSlots = generateTimeSlots(workStart, workEnd, slotDuration);

        // Filter out slots that overlap with existing reservations for the full duration
        const freeSlots = allSlots.filter((slot) => {
          return !reservationsForDate.some((res) => {
            const resStart = new Date(res.start_date);
            const resEnd = new Date(res.end_date);
            const slotEnd = new Date(slot.getTime() + slotDuration * 60000);
            return (slot < resEnd) && (slotEnd > resStart);
          });
        });

        setAvailableSlots(freeSlots);
        if (selectedSlot && freeSlots.some(slot => slot.getTime() === selectedSlot.getTime())) {
          // Keep selected slot if still available
          onSelect(selectedSlot);
        } else {
          onSelect(null);
        }
      } catch (err) {
        setError('Chyba při načítání dostupných časů.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, duration, selectedSlot, onSelect]);

  const handleChange = (e) => {
    const value = e.target.value;
    const date = availableSlots.find(slot => formatTime(slot) === value);
    onSelect(date);
  };

  if (loading) {
    return <Spinner animation="border" role="status" size="sm" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (availableSlots.length === 0) {
    return <p>Žádné dostupné časy pro vybraný den.</p>;
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Vyberte dostupný čas</Form.Label>
      <Form.Select value={selectedSlot ? formatTime(selectedSlot) : ''} onChange={handleChange} required>
        <option value="" disabled>Vyberte čas</option>
        {availableSlots.map((slot) => (
          <option key={slot.toISOString()} value={formatTime(slot)}>
            {formatTime(slot)}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default AvailableSlotsPicker;
