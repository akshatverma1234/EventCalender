import "./responsive.css";
import Droppable from "./Droppable";

const CalendarDays = ({
  daysInMonth,
  firstDayOfMonth,
  currentDate,
  currentMonth,
  currentYear,
  handleClick,
  events,
  activeDragEvent,
}) => {
  const getEventsForDate = (date) => {
    return events.filter((e) => {
      const d = new Date(e.date);
      return (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    });
  };

  const hasConflict = (dateEvents, draggingEvent) => {
    if (!draggingEvent) return false;
    return dateEvents.some(
      (e) =>
        e.title === draggingEvent.title ||
        (e.time && draggingEvent.time && e.time === draggingEvent.time)
    );
  };

  return (
    <div className="days flex flex-wrap">
      {[...Array(firstDayOfMonth).keys()].map((_, ind) => (
        <span key={`empty-${ind}`} />
      ))}

      {[...Array(daysInMonth).keys()].map((day) => {
        const fullDate = new Date(currentYear, currentMonth, day + 1);
        const dateEvents = getEventsForDate(fullDate);
        const conflict = hasConflict(dateEvents, activeDragEvent);

        return (
          <Droppable
            key={day + 1}
            fullDate={fullDate}
            day={day + 1}
            handleClick={handleClick}
            currentDate={currentDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            dateEvents={dateEvents}
            conflict={conflict}
          />
        );
      })}
    </div>
  );
};

export default CalendarDays;
