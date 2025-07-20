import React, { use, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import "./style.css";

const CalenderPage = () => {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectDate, setSelectedDate] = useState(currentDate);
  const [showEvent, setShowEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState(" ");

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const isSameDay = (day1, day2) => {
    return (
      day1.getFullYear() === day2.getFullYear() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getDate() === day2.getDate()
    );
  };
  const handleClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEvent(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };
    setEvents([...events, newEvent]);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setEvents(false);
  };
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="calendar-app !w-[95%] h-[90%] !min-w-[90vmin] !mt-2 bg-[#1e242d] !p-12 rounded-[3rem] border-2 border-[#0f1319] flex gap-[5rem]">
      <div className="calendar w-[40%]">
        <h1 className="heading">Calendar</h1>

        <div className="navigate-date flex items-center gap-x-[1rem] !pl-5">
          <h2 className="month">{months[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="btn flex gap-x-[1rem] !ml-auto">
            <FaAngleLeft
              className="w-8 h-8 bg-[#2c3542] rounded-full flex justify-center items-center text-2xl text-[#c97f1a] cursor-pointer"
              onClick={prevMonth}
            />
            <FaAngleRight
              className="w-8 h-8 bg-[#2c3542] rounded-full flex justify-center items-center text-2xl text-[#c97f1a] cursor-pointer"
              onClick={nextMonth}
            />
          </div>
        </div>

        <div className="weekdays w-[100%] flex !my-12">
          {weeks.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

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
      </div>

      <div className="events w-[60%] h-[100%] !py-12">
        {showEvent && (
          <div className="event-popup absolute top-[38%] left-[3rem] bg-black aspect-[10/9] rounded-[1rem] shadow-2xl w-[clamp(25rem,21cqi,40rem)] flex flex-col justify-center items-center gap-y-8">
            <div className="time-input flex gap-y-[1rem] text-white">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                placeholder="HH"
                value={eventTime.hours}
                onChange={(e) =>
                  setEventTime({ ...eventTime, hours: e.target.value })
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                placeholder="MM"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn">Add Event</button>
            <button
              className="close-event-popup"
              onClick={() => setShowEvent(false)}
            >
              <IoClose className="text-white text-[1.5rem]" />
            </button>
          </div>
        )}

        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">July 15, 2025</div>
            <div className="event-time">10:00</div>
          </div>
          <div className="event-text">Meeting with John</div>
          <div className="event-buttons">
            <LuPencilLine className="text-[1.6rem] text-[#fff] cursor-pointer" />
            <IoClose className="text-[1.6rem] text-[#fff] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderPage;
