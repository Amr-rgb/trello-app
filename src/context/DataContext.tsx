import { createContext, ReactNode, useContext, useState } from "react";
import jsonData from "./../dummyData.json";

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

type DataContextProps = {
  data: ListType[];
  addCard: (listId: number, title: string) => void;
  editCard: (id: number, newTitle: string) => void;
  removeCard: (id: number) => void;
  toggleDone: (id: number) => void;
  addList: () => void;
  editListTitle: (id: number, title: string) => void;
  removeList: (id: number) => void;
};

const DataContext = createContext({} as DataContextProps);

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(jsonData.lists);

  const addCard = (listId: number, title: string) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              { id: new Date().getTime(), title, done: false },
            ],
          };
        } else {
          return list;
        }
      });
    });
  };

  const editCard = (id: number, newTitle: string) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.cards.find((card) => card.id === id)) {
          return {
            ...list,
            cards: list.cards.map((card) => {
              return card.id === id ? { ...card, title: newTitle } : card;
            }),
          };
        } else {
          return list;
        }
      });
    });
  };

  const removeCard = (id: number) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.cards.find((card) => card.id === id)) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== id),
          };
        } else {
          return list;
        }
      });
    });
  };

  const toggleDone = (id: number) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.cards.find((card) => card.id === id)) {
          return {
            ...list,
            cards: list.cards.map((card) => {
              return card.id === id ? { ...card, done: !card.done } : card;
            }),
          };
        } else {
          return list;
        }
      });
    });
  };

  const addList = () => {
    setData((prev) => {
      return [
        ...prev,
        {
          id: new Date().getTime(),
          title: "",
          cards: [],
          cardIds: [],
        },
      ];
    });
  };

  const editListTitle = (id: number, title: string) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.id === id) {
          return { ...list, title: title };
        } else {
          return list;
        }
      });
    });
  };

  const removeList = (id: number) => {
    setData((prev) => {
      return prev.filter((list) => list.id !== id);
    });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addCard,
        editCard,
        removeCard,
        toggleDone,
        addList,
        editListTitle,
        removeList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
