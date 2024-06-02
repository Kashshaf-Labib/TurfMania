import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const BookSingleTurf = ({
  month = dayjs().month(),
  year = dayjs().year(),
  turfId,
  tournament_id = '',
  teams,
  numberofmatches,
}) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const arrayOfDates = [];
  const days = ['Su', 'M', 'Tu', 'W', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    arrayOfDates.push(null); // Fill initial empty slots for the first week
  }

  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    const date = dayjs().year(year).month(month).date(i);
    arrayOfDates.push(date);
  }

  const fetchAvailableTimeSlots = async date => {
    try {
      console.log(turfId, date.format('YYYY-MM-DD'));
      const response = await axios.get(
        `http://localhost:3001/api/available-timeslots?turfId=${turfId}&date=${date.format(
          'YYYY-MM-DD',
        )}`,
      );

      console.log('Available time slots response:', response.data);
      setAvailableTimeSlots(response.data);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableTimeSlots([]); // Ensure it is an empty array in case of error
    }
  };

  const handleDateClick = date => {
    setSelectedDate(date);
    setSelectedTimeSlots([]); // Reset selected time slots when date changes
  };

  const handleTimeSlotClick = start_time => {
    const isSelected = selectedTimeSlots.includes(start_time);
    if (isSelected) {
      setSelectedTimeSlots(
        selectedTimeSlots.filter(slot => slot !== start_time),
      ); // Remove if already selected
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, start_time]); // Add if not selected
    }
    console.log(selectedTimeSlots);
  };
  const handleBookNow = async () => {
    const user = localStorage.getItem('user');
    const customerId = JSON.parse(user);
    console.log(user);
    console.log(numberofmatches);

    if (tournament_id !== '') {
      if (selectedTimeSlots.length < Math.ceil(numberofmatches / 2)) {
        alert('You need more slots to book the tournament');
        return;
      }
    }

    try {
      const bookingData = {
        turf_id: turfId,
        user_id: customerId,
        timeslots: selectedTimeSlots,
        date: selectedDate.format('YYYY-MM-DD'),
      };
      console.log(bookingData);

      const response = await axios.post(
        'http://localhost:3001/api/book-turf',
        bookingData,
      );

      if (response.status === 201) {
        alert('Booking successful');
        setSelectedTimeSlots([]); // Reset selected timeslots after booking
        fetchAvailableTimeSlots(selectedDate); // Refresh available timeslots
      } else {
        throw new Error('Booking failed');
      }

      if (tournament_id !== '') {
        const matchData = {
          tournament_id: tournament_id,
          timeslots: selectedTimeSlots,
          date: selectedDate.format('YYYY-MM-DD'),
          matches: teams,
        };
        const response1 = await axios.post(
          'http://localhost:3001/api/book-tournament',
          matchData,
        );

        if (response1.status === 201) {
          alert('Tournament booking successful');
          setSelectedTimeSlots([]); // Reset selected timeslots after booking
          fetchAvailableTimeSlots(selectedDate); // Refresh available timeslots
        } else {
          throw new Error('Tournament booking failed');
        }
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Error during booking. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {dayjs().month(month).format('MMMM')} {year}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map((day, index) => (
          <div key={index} className="font-semibold text-sm text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {arrayOfDates.map((date, index) =>
          date ? (
            <div
              key={index}
              className={`text-center p-2 rounded cursor-pointer ${
                date.isSame(selectedDate, 'day')
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {date.format('DD')}
            </div>
          ) : (
            <div key={index} className="text-center p-2"></div>
          ),
        )}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Select Time Slot:</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(availableTimeSlots) &&
            availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded border ${
                    selectedTimeSlots.includes(slot.start_time)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleTimeSlotClick(slot.start_time)}
                >
                  {slot.start_time} - {slot.end_time}
                </button>
              ))
            ) : (
              <p>No available time slots for the selected date.</p>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleBookNow}
                disabled={selectedTimeSlots.length === 0} // Disable button if no timeslots selected
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSingleTurf;
