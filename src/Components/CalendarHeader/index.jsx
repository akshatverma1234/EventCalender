import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import "./responsive.css";

const CalendarHeader = ({
  currentMonth,
  currentYear,
  months,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div className="navigate-date flex items-center gap-x-[1rem] !pl-5">
      <h2 className="month">{months[currentMonth]},</h2>
      <h2 className="year">{currentYear}</h2>
      <div className="btn flex gap-x-[1rem] !ml-auto">
        <FaAngleLeft
          className="w-8 h-8 bg-[#2c3542] rounded-full text-2xl text-[#c97f1a] cursor-pointer"
          onClick={prevMonth}
        />
        <FaAngleRight
          className="w-8 h-8 bg-[#2c3542] rounded-full text-2xl text-[#c97f1a] cursor-pointer"
          onClick={nextMonth}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
