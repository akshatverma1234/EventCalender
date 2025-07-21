import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";
import CalendarHeader from "../CalendarHeader";
import WeekDaysRow from "../WeekDaysRows";
import EventPopup from "../EventPopup";
import EventList from "../EventList";
import CalendarDays from "../CalendarDays";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

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
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event) => {
    const eventData = event.active.data?.current;
    if (eventData) {
      setDraggedEvent(eventData);
    }
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over && draggedEvent) {
      const newDate = new Date(over.id);
      const conflict = events.some((e) => {
        const d = new Date(e.date);
        return (
          d.getFullYear() === newDate.getFullYear() &&
          d.getMonth() === newDate.getMonth() &&
          d.getDate() === newDate.getDate()
        );
      });

      if (conflict) {
        alert("⚠️ Cannot drop: There's already an event on this day.");
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === draggedEvent.id ? { ...e, date: newDate } : e
          )
        );
      }
    }
    setDraggedEvent(null);
  };

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
    const [hours, minutes] = e.time.split(":"); // Fix split!
    setSelectedDate(new Date(e.date));
    setEventTime({
      hours: hours.padStart(2, "0"),
      minutes: minutes.padStart(2, "0"),
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
            events={events}
            activeDragEvent={draggedEvent}
          />
        </div>

        <div className="events w-[60%] h-[100%] !py-12 overflow-y-auto">
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
    </DndContext>
  );
};

export default CalenderPage;
