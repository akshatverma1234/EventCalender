import React from "react";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const EventList = ({ events, months, handleEditEvent, handleDeleteEvent }) => (
  <>
    {events.map((event, ind) => (
      <div className="event" key={ind}>
        <div className="event-date-wrapper">
          <div className="event-date">
            {`${
              months[event.date.getMonth()]
            } ${event.date.getDate()}, ${event.date.getFullYear()}`}
          </div>
          <div className="event-time">{event.time}</div>
        </div>
        <div className="event-text">{event.text}</div>
        <div className="event-buttons">
          <LuPencilLine
            className="text-[1.6rem] text-[#fff] cursor-pointer"
            onClick={() => handleEditEvent(event)}
          />
          <IoClose
            className="text-[1.6rem] text-[#fff] cursor-pointer"
            onClick={() => handleDeleteEvent(event.id)}
          />
        </div>
      </div>
    ))}
  </>
);

export default EventList;
