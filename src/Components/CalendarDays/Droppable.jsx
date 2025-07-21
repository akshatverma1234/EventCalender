import { useDroppable } from "@dnd-kit/core";
import DraggableEvent from "./../DraggableEvent";

const Droppable = ({
  fullDate,
  day,
  handleClick,
  currentDate,
  currentMonth,
  currentYear,
  dateEvents,
  conflict,
}) => {
  const dateId = fullDate.toISOString().split("T")[0];
  const { setNodeRef } = useDroppable({ id: dateId });

  return (
    <span
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
        {dateEvents.map((event) => (
          <DraggableEvent key={event.id} event={event} />
        ))}
      </div>
    </span>
  );
};

export default Droppable;
