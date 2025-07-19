import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import "./style.css";

const CalenderPage = () => {
  return (
    <div className="calendar-app !w-[95%] h-[90%] !min-w-[90vmin] !mt-2 bg-[#1e242d] !p-12 rounded-[3rem] border-2 border-[#0f1319] flex gap-[5rem]">
      <div className="calendar w-[40%]">
        <h1 className="heading">Calendar</h1>

        <div className="navigate-date flex items-center gap-x-[1rem] !pl-5">
          <h2 className="month">May,</h2>
          <h2 className="year">2025</h2>
          <div className="btn flex gap-x-[1rem] !ml-auto">
            <FaAngleLeft className="w-8 h-8 bg-[#2c3542] rounded-full flex justify-center items-center text-2xl text-[#c97f1a] cursor-pointer" />
            <FaAngleRight className="w-8 h-8 bg-[#2c3542] rounded-full flex justify-center items-center text-2xl text-[#c97f1a] cursor-pointer" />
          </div>
        </div>

        <div className="weekdays w-[100%] flex !my-12">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="days flex flex-wrap">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
          <span>18</span>
          <span className="current-day bg-blue-500 rounded-[50%] shadow-2xl">
            19
          </span>
          <span>20</span>
          <span>21</span>
          <span>22</span>
          <span>23</span>
          <span>24</span>
          <span>25</span>
          <span>26</span>
          <span>27</span>
          <span>28</span>
          <span>29</span>
          <span>30</span>
          <span>31</span>
        </div>
      </div>

      <div className="events">
        <div className="event-popup">
          <div className="time-input">
            <div className="event-popup-time">Time</div>
            <input
              type="number"
              name="hours"
              min={0}
              max={24}
              className="hours"
              placeholder="HH"
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className="minutes"
              placeholder="MM"
            />
          </div>
          <textarea
            placeholder="Enter Event Text (Maximum 60 Characters)"
            maxLength={60}
          ></textarea>
          <button className="event-popup-btn">Add Event</button>
          <button className="close-event-popup">
            <IoClose />
          </button>
        </div>

        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">July 15, 2025</div>
            <div className="event-time">10:00</div>
          </div>
          <div className="event-text">Meeting with John</div>
          <div className="event-buttons">
            <LuPencilLine />
            <IoClose />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderPage;
