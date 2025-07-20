import React from "react";

const WeekDaysRow = () => {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="weekdays w-[100%] flex !my-9 ">
      {weeks.map((day) => (
        <span key={day}>{day}</span>
      ))}
    </div>
  );
};

export default WeekDaysRow;
