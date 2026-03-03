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
    <div className="calendar-wrapper" style={{ padding: "20px" }}>
      <h2>Select Dates</h2>

      <div className="months-container" style={{ display: "flex", gap: "30px" }}>
        {getNext3Months().map((monthObj, idx) => (
          <div key={idx}>
            <h3>{format(monthObj.month, "MMMM yyyy")}</h3>

            <div
              className="calendar-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 40px)",
                gap: "6px",
              }}
            >
              {monthObj.days.map((day, i) => {
                const booked = isBooked(day);
                const selected = isSelected(day);
                const start = selectedRange.start && isSameDay(day, selectedRange.start);
                const end = selectedRange.end && isSameDay(day, selectedRange.end);

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectDate(day)}
                    disabled={booked}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: booked
                        ? "red"
                        : start || end
                        ? "#4CAF50"
                        : selected
                        ? "#A5D6A7"
                        : "white",
                      color: booked ? "white" : "black",
                      cursor: booked ? "not-allowed" : "pointer",
                    }}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
        Selected Range:{" "}
        {selectedRange.start && format(selectedRange.start, "dd MMM yyyy")} →{" "}
        {selectedRange.end
          ? format(selectedRange.end, "dd MMM yyyy")
          : "Select end date"}
      </pre>
    </div>
  );
};

export default CalendarSection;