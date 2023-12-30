import React, { createContext, useState } from "react";
import { DraggableLocation, DropResult } from "@hello-pangea/dnd";
import { AllTaskContextProps, AllTaskType, CardType } from "@typings/task.type";

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
  updatedTaskBoard: () => {},
  dragEndTaskItem: () => {},
};

export const TaskContext = createContext<AllTaskContextProps>(initialValue);

interface ContextProviderProps {
  children: React.ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [allTask, setAllTask] = useState<AllTaskType>(initialValue.allTask);

  const updatedTaskBoard = (updatedTasks: AllTaskType) => {
    setAllTask(updatedTasks);
  };

  const dragEndTaskItem = (result: DropResult) => {
    const { destination, draggableId, type } = result;
    const { index: sourceIndex, droppableId: sourceId } = result.source;
    const { index: destinationIndex, droppableId: destinationId } =
      destination as DraggableLocation;

    const { lists, listId } = allTask;

    if (!destination) return;

    if (type === "list") {
      const newListIds = listId;
      newListIds.splice(sourceIndex, 1);
      newListIds.splice(destinationIndex, 0, draggableId);
      return;
    }

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
      value={{
        allTask,
        updatedTaskBoard,
        dragEndTaskItem,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default ContextProvider;
