import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../context/DataContext";
import { Check, Trash } from "./Svgs";

import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

type CardType = {
  id: number;
  title: string;
  done: boolean;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card = ({
  listId,
  card,
  idx,
  isNew = true,
  draggedId,
  setDraggedId,
}: {
  listId: number;
  card: CardType;
  idx: number;
  isNew: boolean;
  draggedId?: number;
  setDraggedId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const { editCard, removeCard, toggleDone, moveCard, data } = useDataContext();

  const inputField = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(card.title);
  const [isTyping, setIsTyping] = useState(isNew);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (
      e.nativeEvent.explicitOriginalTarget === e.target.nextSibling ||
      e.nativeEvent.explicitOriginalTarget.nearestViewportElement ===
        e.target.nextSibling
    ) {
      removeCard(card.id);
    }
    if (value.trim()) {
      setIsTyping(false);
      value.trim() !== card.title && editCard(card.id, value);
    } else {
      removeCard(card.id);
    }
  };

  useEffect(() => {
    if (isTyping) {
      inputField.current?.focus();
    }
    console.log(draggedId);
  }, [isTyping, draggedId]);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = idx;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      // console.log(draggedId);
      moveCard(dragIndex, hoverIndex, listId, draggedId);
      // console.log(data);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      setDraggedId(listId);
      return { id: card.id, index: idx };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity, cursor: "pointer" }}>
      <div
        style={{
          position: "relative",
          marginBottom: ".5rem",
          display: isTyping ? "block" : "none",
        }}
      >
        <input
          ref={inputField}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-3 pe-5 border border-dark w-100"
          style={{
            borderRadius: "12px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onBlur={blurHandler}
        />
        <Trash
          style={{
            cursor: "pointer",
            width: "17px",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            boxSizing: "content-box",
          }}
        />
      </div>

      <div
        className="card-content"
        style={{
          position: "relative",
          display: isTyping ? "none" : "block",
          opacity: card.done ? 0.5 : 1,
        }}
      >
        <p
          className="p-3 pe-5 mb-"
          style={{
            background: "#F6F6F6",
            borderRadius: "12px",
          }}
          onClick={() => setIsTyping(true)}
        >
          {card.title}
        </p>

        <div
          className={`${
            card.done ? "done" : ""
          } trigger d-flex justify-content-center align-items-center`}
          style={{
            cursor: "pointer",
            width: "45px",
            height: "45px",
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
          }}
          onClick={() => toggleDone(card.id)}
        >
          <span
            className="border border-dark rounded-circle d-block"
            style={{
              width: "20px",
              height: "20px",
              position: "relative",
            }}
          >
            <Check
              style={{
                width: "10px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxSizing: "content-box",
                opacity: card.done ? 1 : 0,
                transition: "opacity .3s",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
