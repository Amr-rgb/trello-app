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
  moveCard: (dragIndex: number, hoverIndex: number, id: number) => void;
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
          const newId = new Date().getTime();

          return {
            ...list,
            cards: [...list.cards, { id: newId, title, done: false }],
            cardIds: [...list.cardIds, newId],
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
            cardIds: list.cardIds.filter((cardId) => cardId !== id),
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

  const moveCard = (dragIndex: number, hoverIndex: number, id: number) => {
    setData((prev) => {
      return prev.map((list) => {
        if (list.id !== id) return list;

        const newCardIds = [...list.cardIds];
        const ourId = newCardIds.splice(dragIndex, 1);
        newCardIds.splice(hoverIndex, 0, ourId[0]);

        return {
          ...list,
          cardIds: newCardIds,
        };
      });
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
        moveCard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
