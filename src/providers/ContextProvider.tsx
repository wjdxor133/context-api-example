import { DraggableLocation, DropResult } from "@hello-pangea/dnd";
import React, { createContext, useState } from "react";

export interface CardType {
  id: string;
  title: string;
}

export interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}

export interface ListsType {
  [key: string]: ListType;
}

export type ListIdType = string[];

export interface AllTaskType {
  lists: ListsType;
  listId: ListIdType;
}

interface AllTaskContextProps {
  allTask: AllTaskType;
  addTaskCard: (updatedTasks: AllTaskType) => void;
  addTaskList: (updatedTaskList: AllTaskType) => void;
  dragEndTaskCard: (result: DropResult) => void;
}

const cards: CardType[] = [
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
  dragEndTaskCard: () => {},
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

  const dragEndTaskCard = (result: DropResult) => {
    const { index: sourceIndex, droppableId: sourceId } = result.source;
    const { index: destinationIndex, droppableId: destinationId } =
      result.destination as DraggableLocation;

    const { lists } = allTask;
    const sourceList = lists[sourceId];

    let updatedLists = { ...lists };

    // 항목의 순서를 변경하기 위해 출발지와 목적지가 다른 경우에만 처리
    if (sourceId !== destinationId || sourceIndex !== destinationIndex) {
      const removedCard = sourceList.cards[sourceIndex];

      const updatedCards = sourceList.cards.slice();
      updatedCards.splice(sourceIndex, 1); // 출발지에서 항목 제거
      updatedCards.splice(destinationIndex, 0, removedCard); // 목적지에 항목 삽입

      updatedLists = {
        ...lists,
        [sourceId]: { ...sourceList, cards: updatedCards },
      };
    }

    setAllTask({
      ...allTask,
      lists: updatedLists,
    });
  };

  return (
    <TaskContext.Provider
      value={{ allTask, addTaskCard, addTaskList, dragEndTaskCard }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default ContextProvider;
