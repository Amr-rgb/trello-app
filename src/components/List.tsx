import { Button, Card } from "react-bootstrap";
import { Plus } from "./Svgs";

export const List = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <Card className="card-container">
      <Card.Body>
        <Card.Title className="mt-1 ms-3 pt-2 pb-4 fs-6 fw-bold">
          {title}
        </Card.Title>

        {items.map((item) => (
          <p
            className="p-3 mb-2"
            style={{ background: "#F6F6F6", borderRadius: "12px" }}
          >
            {item}
          </p>
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
      </Card.Body>
    </Card>
  );
};
