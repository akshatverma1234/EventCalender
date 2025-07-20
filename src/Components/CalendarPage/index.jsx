import React, { use, useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import "./style.css";
import CalendarHeader from "../CalendarHeader";
import WeekDaysRow from "../WeekDaysRows";
import EventPopup from "../EventPopup";
import EventList from "../EventList";
import CalendarDays from "../CalendarDays";

const CalenderPage = () => {
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
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      return parsedEvents.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
    return [];
  });

  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState(" ");
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const serializedEvents = JSON.stringify(
      events.map((event) => ({
        ...event,
        date: event.date.toISOString(),
      }))
    );
    localStorage.setItem("calendarEvents", serializedEvents);
  }, [events]);

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
      setEditingEvent(null);
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };
    let updatedEvents = [...events];
    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEvent(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (e) => {
    setSelectedDate(new Date(e.date));
    setEventTime({
      hours: e.time.split(" : ")[0],
      minutes: e.time.split(" : ")[1],
    });
    setEventText(e.text);
    setEditingEvent(e);
    setShowEvent(true);
  };

  const handleDeleteEvent = (eId) => {
    const updateEvents = events.filter((e) => e.id !== eId);
    setEvents(updateEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="calendar-app !w-[95%] h-[95%] !min-w-[90vmin] !mt-1 bg-[#e9e9e9] !p-12 rounded-[3rem] border-2 border-[#0f1319] flex gap-[5rem]">
      <div className="calendar w-[40%]">
        <h1 className="heading">Calendar</h1>

        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          months={months}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <WeekDaysRow />

        <CalendarDays
          daysInMonth={daysInMonth}
          firstDayOfMonth={firstDayOfMonth}
          currentDate={currentDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          handleClick={handleClick}
        />
      </div>

      <div className="events w-[60%] h-[100%] !py-12">
        {showEvent && (
          <EventPopup
            eventTime={eventTime}
            handleTimeChange={handleTimeChange}
            eventText={eventText}
            setEventText={setEventText}
            handleEventSubmit={handleEventSubmit}
            setShowEvent={setShowEvent}
            editingEvent={editingEvent}
          />
        )}

        <EventList
          events={events}
          months={months}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default CalenderPage;
