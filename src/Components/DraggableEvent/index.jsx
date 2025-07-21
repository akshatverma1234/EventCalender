import { useDraggable } from "@dnd-kit/core";

const DraggableEvent = ({ event }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
    data: { ...event },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-[#0f1319] text-white p-1 rounded-md mt-1 text-sm cursor-move"
    >
      {event.text}
    </div>
  );
};

export default DraggableEvent;
