import { useEffect, useState } from "react";
import {
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
import axios from "axios";
import './calendar.css'

const CalendarSection = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  // Fetch booked dates from backend
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/bookings/booked-dates");

        // convert string to Date
        const converted = res.data.bookedDates.map((d) => new Date(d));

        setBookedDates(converted);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  // Check if a date is booked
  const isBooked = (day) =>
    bookedDates.some((b) => isSameDay(b, day));

  // Handle date click for selecting range
  const handleSelectDate = (day) => {
    if (isBooked(day)) return; // block selection

    if (!selectedRange.start) {
      setSelectedRange({ start: day, end: null });
      return;
    }

    if (selectedRange.start && !selectedRange.end) {
      if (isBefore(day, selectedRange.start)) {
        // If clicked before start, swap
        setSelectedRange({ start: day, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: day });
      }
      return;
    }

    // Reset if full range is already selected
    setSelectedRange({ start: day, end: null });
  };

  // Check if date is inside selected range
  const isSelected = (day) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return (
      !isBefore(day, selectedRange.start) &&
      !isAfter(day, selectedRange.end)
    );
  };

  // Generate days for next 3 months
  const getNext3Months = () => {
    const months = [];
    for (let i = 0; i < 3; i++) {
      const monthStart = startOfMonth(addMonths(new Date(), i));
      const monthEnd = endOfMonth(addMonths(new Date(), i));

      const days = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
      });

      months.push({ month: monthStart, days });
    }
    return months;
  };

  return (
      <div className="calendar-section">

  <h2 className="section-heading">Select Your Dates</h2>

  {/* TOP ROW (2 months) */}
  <div className="calendar-row">
    {getNext3Months().slice(0, 2).map((monthObj, idx) => (
      <div className="calendar-month" key={idx}>
        <h3 className="month-name">{format(monthObj.month, "MMMM yyyy")}</h3>

        <div className="weekday-row">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
          <span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <div className="calendar-grid">
          {monthObj.days.map((day, i) => {
            const booked = isBooked(day);
            const selected = isSelected(day);
            const start = selectedRange.start && isSameDay(day, selectedRange.start);
            const end = selectedRange.end && isSameDay(day, selectedRange.end);

            return (
              <button
                key={i}
                className={`day 
                    ${booked ? "booked" : ""} 
                    ${start ? "start" : ""} 
                    ${end ? "end" : ""} 
                    ${selected ? "selected" : ""}`}
                disabled={booked}
                onClick={() => handleSelectDate(day)}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>

  {/* BOTTOM ROW (3rd month) */}
  <div className="calendar-row center-row">
    {getNext3Months().slice(2, 3).map((monthObj, idx) => (
      <div className="calendar-month" key={idx}>
        <h3 className="month-name">{format(monthObj.month, "MMMM yyyy")}</h3>

        <div className="weekday-row">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
          <span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <div className="calendar-grid">
          {monthObj.days.map((day, i) => {
            const booked = isBooked(day);
            const selected = isSelected(day);
            const start = selectedRange.start && isSameDay(day, selectedRange.start);
            const end = selectedRange.end && isSameDay(day, selectedRange.end);

            return (
              <button
                key={i}
                className={`day 
                    ${booked ? "booked" : ""} 
                    ${start ? "start" : ""} 
                    ${end ? "end" : ""} 
                    ${selected ? "selected" : ""}`}
                disabled={booked}
                onClick={() => handleSelectDate(day)}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default CalendarSection;