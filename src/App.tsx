import { useState } from "react";
import { Button } from "react-bootstrap";
import { List } from "./components/List";
import { Plus } from "./components/Svgs";
import { useDataContext } from "./context/DataContext";

function App() {
  const { data, addList } = useDataContext();

  const clickHandler = () => {
    addList();
  };

  return (
    <div className="app px-3 px-sm-4 d-grid justify-content-center align-items-start gap-4">
      {data.map((list) => (
        <List key={list.id} list={list} isNew={!list.title} />
      ))}

      <Button
        className="d-flex align-items-center gap-2"
        style={{
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          boxShadow: "none",
          width: "max-content",
          padding: ".8rem 1.6rem",
        }}
        onClick={clickHandler}
      >
        <Plus color="#fff" /> Add Another Card
      </Button>
    </div>
  );
}

export default App;
