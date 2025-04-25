import React, { useEffect, useState } from "react";
import "../../styles/Booking.css";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://senior-project-java-backend.onrender.com";

const Booking = () => {
  const [venues, setVenues] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);

  const [myBookingIds, setMyBookingIds] = useState(() => {
    const saved = localStorage.getItem("myBookingIds");
    return saved ? JSON.parse(saved) : [];
  });
  const [myBookings, setMyBookings] = useState([]);

  const token = localStorage.getItem("token");

  const parseTimeToMinutes = (t) => {
    if (typeof t === "string") {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    }
    return t.hour * 60 + t.minute;
  };

  const formatTime = (t) => {
    if (typeof t === "string") return t;
    const h = String(t.hour).padStart(2, "0");
    const m = String(t.minute).padStart(2, "0");
    return `${h}:${m}:00`;
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/venues/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setVenues)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    fetch(`${API_BASE}/api/venue-reservations/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setReservations)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    setMyBookings([]);
    myBookingIds.forEach((id) => {
      fetch(`${API_BASE}/api/venue-reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyBookings((prev) => [...prev, data]))
        .catch(console.error);
    });
  }, [myBookingIds, token]);

  useEffect(() => {
    localStorage.setItem("myBookingIds", JSON.stringify(myBookingIds));
  }, [myBookingIds]);

  const checkAvailability = () => {
    if (!selectedVenueId || !date || !timeFrom || !timeTo) {
      alert("Please select a venue, date, and time range.");
      return;
    }
    const fromTotal = parseTimeToMinutes(timeFrom);
    const toTotal = parseTimeToMinutes(timeTo);

    const existing = reservations.filter(
      (r) =>
        Number(r.venue.venue_id) === Number(selectedVenueId) && r.date === date
    );

    const conflict = existing.some((r) => {
      const rFrom = parseTimeToMinutes(r.time_from);
      const rTo = parseTimeToMinutes(r.time_to);
      return !(toTotal <= rFrom || fromTotal >= rTo);
    });

    setIsAvailable(!conflict);
  };

  const handleBooking = async () => {
    if (!isAvailable) {
      alert("This slot is not available. Please choose another.");
      return;
    }

    const startTime = `${timeFrom}:00`;
    const endTime = `${timeTo}:00`;

    const payload = {
      venue: { venue_id: Number(selectedVenueId) },
      date,
      time_from: startTime,
      time_to: endTime,
      date_request_sent: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`${API_BASE}/api/venue-reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Booking failed status:", res.status, errorText);
        throw new Error(`Booking failed: ${res.status}`);
      }

      const newRes = await res.json();
      alert("Booking successful!");
      setMyBookingIds((prev) => [...prev, newRes.reservation_id]);
      setIsAvailable(null);
    } catch (err) {
      console.error(err);
      alert("Error during booking. Please check console for details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/venue-reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBookingIds((prev) => prev.filter((bid) => bid !== id));
      setMyBookings((prev) => prev.filter((b) => b.reservation_id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div className="booking">
      <div className="booking-section-header">
        <i className="fa fa-calendar-check"></i>
        <h3>Booking</h3>
      </div>
      <div className="booking-card">
        <div className="form-group">
          <label>Venue:</label>
          <select
            value={selectedVenueId}
            onChange={(e) => setSelectedVenueId(e.target.value)}
          >
            <option value="">-- Select Venue --</option>
            {venues.map((v) => (
              <option key={v.venue_id} value={v.venue_id}>
                {v.venueTitle} (Capacity: {v.capacity})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group time-range">
          <div>
            <label>From:</label>
            <input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type="time"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
            />
          </div>
        </div>

        <div className="actions">
          <button onClick={checkAvailability}>Check Availability</button>
          <button onClick={handleBooking} disabled={isAvailable !== true}>
            Book
          </button>
        </div>

        {isAvailable === true && (
          <p className="available">Slot is available!</p>
        )}
        {isAvailable === false && (
          <p className="unavailable">Slot is unavailable.</p>
        )}
      </div>

      <div className="booking-section-header">
        <i className="fa fa-calendar-check"></i>
        <h3>My Bookings</h3>
      </div>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Venue</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myBookings.map((b) => (
            <tr key={b.reservation_id}>
              <td>{b.venue.venueTitle}</td>
              <td>{b.date}</td>
              <td>{formatTime(b.time_from)}</td>
              <td>{formatTime(b.time_to)}</td>
              <td>
                <button onClick={() => handleDelete(b.reservation_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
