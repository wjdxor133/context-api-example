import React, { createContext, useState } from "react";

export interface Card {
  id: string;
  title: string;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Lists {
  [key: string]: List;
}

export type ListId = string[];

export interface AllTaskType {
  lists: Lists;
  listId: ListId;
}

interface AllTaskContextProps {
  allTask: AllTaskType;
  addTaskCard: (updatedTasks: AllTaskType) => void;
  addTaskList: (updatedTaskList: AllTaskType) => void;
}

const cards: Card[] = [
  {
    id: "1",
    title: "테스크 1",
  },
];

const initialValue: AllTaskContextProps = {
  allTask: {
    lists: {
      "list-1": {
        id: "list-1",
        title: "Todo",
        cards,
      },
    },
    listId: ["list-1"],
  },
  addTaskCard: () => {},
  addTaskList: () => {},
};

export const TaskContext = createContext<AllTaskContextProps>(initialValue);

interface ContextProviderProps {
  children: React.ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [allTask, setAllTask] = useState<AllTaskType>(initialValue.allTask);

  const addTaskCard = (updatedTasks: AllTaskType) => {
    setAllTask(updatedTasks);
  };

  const addTaskList = (updatedTaskList: AllTaskType) => {
    setAllTask(updatedTaskList);
  };

  return (
    <TaskContext.Provider value={{ allTask, addTaskCard, addTaskList }}>
      {children}
    </TaskContext.Provider>
  );
}

export default ContextProvider;
