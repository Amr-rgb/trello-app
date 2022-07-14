import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../context/DataContext";

type CardType = {
  id: number;
  title: string;
};

export const Card = ({
  card,
  isNew = true,
}: {
  card: CardType;
  isNew: boolean;
}) => {
  const { editCard, removeCard } = useDataContext();

  const inputField = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(card.title);
  const [isTyping, setIsTyping] = useState(isNew);

  const clickHandler = () => {
    if (value.trim()) {
      setIsTyping(false);
      editCard(card.id, value);
    } else {
      removeCard(card.id);
    }
  };

  useEffect(() => {
    if (isTyping) {
      inputField.current?.focus();
    }
  }, [isTyping]);

  return (
    <>
      <input
        ref={inputField}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-3 mb-2 border border-dark w-100"
        style={{
          borderRadius: "12px",
          outline: "none",
          display: isTyping ? "block" : "none",
        }}
        onBlur={clickHandler}
      />
      <p
        className="p-3 mb-2"
        style={{
          background: "#F6F6F6",
          borderRadius: "12px",
          display: isTyping ? "none" : "block",
        }}
        onClick={() => setIsTyping(true)}
      >
        {card.title}
      </p>
    </>
  );
};
