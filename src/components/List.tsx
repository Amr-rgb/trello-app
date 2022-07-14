import { Button, Card as CardBs } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { Card } from "./Card";
import { Plus } from "./Svgs";

type CardType = {
  id: number;
  title: string;
};

type ListType = {
  id: number;
  title: string;
  cards: CardType[];
};

export const List = ({ list }: { list: ListType }) => {
  const { addCard } = useDataContext();

  const clickHandler = () => {
    addCard(list.id, "");
  };

  return (
    <CardBs className="card-container">
      <CardBs.Body>
        <CardBs.Title className="mt-1 ms-3 pt-2 pb-4 fs-6 fw-bold">
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
          onClick={clickHandler}
        >
          <Plus color="#000" /> Add Another Card
        </Button>
      </CardBs.Body>
    </CardBs>
  );
};
