import React from "react";

const CalendarDays = ({
  daysInMonth,
  firstDayOfMonth,
  currentDate,
  currentMonth,
  currentYear,
  handleClick,
}) => {
  return (
    <div className="days flex flex-wrap">
      {[...Array(firstDayOfMonth).keys()].map((_, ind) => (
        <span key={`empty-${ind}`} />
      ))}
      {[...Array(daysInMonth).keys()].map((day) => (
        <span
          key={day + 1}
          className={
            day + 1 === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear()
              ? "currentDate"
              : ""
          }
          onClick={() => handleClick(day + 1)}
        >
          {day + 1}
        </span>
      ))}
    </div>
  );
};

export default CalendarDays;
