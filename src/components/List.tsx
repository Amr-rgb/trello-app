import { Button, Card as CardBs } from "react-bootstrap";
import { Card } from "./Card";
import { Plus } from "./Svgs";

type CardType = {
  id: number;
  title: string;
};

type ListType = {
  title: string;
  cards: CardType[];
};

export const List = ({ title, cards }: ListType) => {
  return (
    <CardBs className="card-container">
      <CardBs.Body>
        <CardBs.Title className="mt-1 ms-3 pt-2 pb-4 fs-6 fw-bold">
          {title}
        </CardBs.Title>

        {cards.map((card) => (
          <Card key={card.id} card={card} />
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
        >
          <Plus color="#000" /> Add Another Card
        </Button>
      </CardBs.Body>
    </CardBs>
  );
};
