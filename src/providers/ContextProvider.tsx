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
      "list-2": {
        id: "list-2",
        title: "Doing",
        cards: [
          {
            id: "2",
            title: "테스크 2",
          },
        ],
      },
    },
    listId: ["list-1", "list-2"],
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
    const { draggableId } = result;
    const { index: sourceIndex, droppableId: sourceId } = result.source;
    const { index: destinationIndex, droppableId: destinationId } =
      result.destination as DraggableLocation;

    const { lists } = allTask;

    const sourceList = lists[sourceId];
    const destinationList = lists[destinationId];
    const draggingCard = sourceList.cards.filter((card) => {
      return card.id === draggableId;
    })[0];

    sourceList.cards.splice(sourceIndex, 1);
    destinationList.cards.splice(destinationIndex, 0, draggingCard);

    let updatedLists = { ...lists };

    if (sourceId === destinationId) {
      updatedLists = {
        ...lists,
        [sourceId]: sourceList,
      };
    }

    if (sourceId !== destinationId) {
      updatedLists = {
        ...lists,
        [sourceId]: sourceList,
        [destinationId]: destinationList,
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
