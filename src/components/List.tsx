import { useEffect, useRef, useState } from "react";
import { Button, Card as CardBs } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { Card } from "./Card";
import { Plus } from "./Svgs";

type CardType = {
  id: number;
  title: string;
  done: boolean;
};

type ListType = {
  id: number;
  title: string;
  cards: CardType[];
  cardIds: number[];
};

export const List = ({
  list,
  isNew = true,
}: {
  list: ListType;
  isNew: boolean;
}) => {
  const { addCard, editListTitle, removeList } = useDataContext();

  const inputField = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(list.title);
  const [isTyping, setIsTyping] = useState(isNew);

  const blurHandler = () => {
    if (value.trim()) {
      setIsTyping(false);
      editListTitle(list.id, value);
    } else {
      isNew ? removeList(list.id) : setIsTyping(false);
      editListTitle(list.id, "NO-TITLE");
    }
  };

  useEffect(() => {
    if (isTyping) {
      inputField.current?.focus();
    }
  }, [isTyping]);

  return (
    <CardBs className="card-container">
      <CardBs.Body>
        <input
          ref={inputField}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 mt-1 mb-2 ms-3 pt-1 pb-4 fw-bold"
          style={{
            width: "calc(100% - 1rem)",
            outline: "none",
            display: isTyping ? "block" : "none",
          }}
          onBlur={blurHandler}
        />
        <CardBs.Title
          className="mt-1 ms-3 pt-2 pb-4 fs-6 fw-bold"
          style={{
            display: isTyping ? "none" : "block",
          }}
          onClick={() => setIsTyping(true)}
        >
          {list.title}
        </CardBs.Title>

        {list.cards.map((card) => (
          <Card key={card.id} card={card} isNew={card.title === ""} />
        ))}

        <Button
          className="d-flex align-items-center gap-2"
          style={{
            background: "#fff",
            color: "#000",
            border: "none",
            boxShadow: "none",
            marginTop: "2rem",
          }}
          onClick={() => addCard(list.id, "")}
        >
          <Plus color="#000" /> Add Another Card
        </Button>
      </CardBs.Body>
    </CardBs>
  );
};
