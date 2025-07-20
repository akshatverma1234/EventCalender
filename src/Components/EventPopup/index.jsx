import React from "react";
import { IoClose } from "react-icons/io5";

const EventPopup = ({
  eventTime,
  handleTimeChange,
  eventText,
  setEventText,
  handleEventSubmit,
  setShowEvent,
  editingEvent,
}) => {
  return (
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
          onChange={handleTimeChange}
        />
        <input
          type="number"
          name="minutes"
          min={0}
          max={60}
          className="minutes"
          placeholder="MM"
          value={eventTime.minutes}
          onChange={handleTimeChange}
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
      <button className="event-popup-btn" onClick={handleEventSubmit}>
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
      <button className="close-event-popup" onClick={() => setShowEvent(false)}>
        <IoClose className="text-white text-[1.5rem]" />
      </button>
    </div>
  );
};

export default EventPopup;
