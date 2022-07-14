import { createContext, ReactNode, useContext, useState } from "react";
import jsonData from "./../dummyData.json";

type CardType = {
  id: number;
  title: string;
};

type ListType = {
  id: number;
  title: string;
  cards: CardType[];
};

type DataContextProps = {
  data: ListType[];
  editCard: (id: number, newTitle: string) => void;
  removeCard: (id: number) => void;
};

const DataContext = createContext({} as DataContextProps);

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(jsonData.lists);

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

  return (
    <DataContext.Provider value={{ data, editCard, removeCard }}>
      {children}
    </DataContext.Provider>
  );
};
