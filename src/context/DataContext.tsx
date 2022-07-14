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
};

const DataContext = createContext({} as DataContextProps);

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(jsonData.lists);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};
