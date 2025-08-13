import React, { useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  const addBooking = () => {
    const newBooking = { id: Date.now(), name: "John Doe" };
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Bookings</h2>
      <button
        onClick={addBooking}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
      >
        Add Booking
      </button>
      <ul>
        {bookings.map((b) => (
          <li key={b.id} className="p-2 border-b">{b.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
