import dayjs from 'dayjs';
import { useState } from 'react';

const BookSingleTurf = ({ month = dayjs().month(), year = dayjs().year() }) => {
  const currentDate = dayjs();
  const firstDayOfMonth = dayjs().year(year).month(month).date(1);
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const arrayOfDates = [];
  const days = ['Su', 'M', 'Tu', 'W', 'Th', 'Fr', 'Sa'];

  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    const date = dayjs().year(year).month(month).date(i);
    if (date.isAfter(currentDate, 'day') || date.isSame(currentDate, 'day')) {
      arrayOfDates.push(date);
    }
  }

  const handleDateClick = date => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset selected time slot when date changes
  };

  const handleTimeSlotClick = timeSlot => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.format('MMMM')} {currentDate.format('YYYY')}
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
        {arrayOfDates.map((date, index) => (
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
        ))}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Select Time Slot:</h3>
          <div className="flex flex-wrap gap-2">
            {[...Array(12).keys()].map(hour => (
              <button
                key={hour}
                className={`px-4 py-2 rounded border ${
                  selectedTimeSlot === hour ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => handleTimeSlotClick(hour)}
              >
                {hour}:00 - {hour + 1}:00
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSingleTurf;
