import { useDroppable } from "@dnd-kit/core";
import DraggableEvent from "./../DraggableEvent";
import "./responsive.css";
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
        const dateId = fullDate.toISOString().split("T")[0];
        const { setNodeRef } = useDroppable({ id: dateId });
        const dateEvents = getEventsForDate(fullDate);

        const conflict = hasConflict(dateEvents, activeDragEvent);
        return (
          <span
            key={day + 1}
            ref={setNodeRef}
            onClick={() => handleClick(day + 1)}
            className={`relative transition-all duration-150
              ${
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "currentDate"
                  : ""
              }
              ${conflict ? "border-2 border-red-500" : ""}
            `}
            title={conflict ? "⚠️ Conflict with existing event!" : ""}
          >
            {day + 1}
            <div className="flex flex-col gap-[2px] mt-1">
              {getEventsForDate(fullDate).map((event) => (
                <DraggableEvent key={event.id} event={event} />
              ))}
            </div>
          </span>
        );
      })}
    </div>
  );
};
export default CalendarDays;
