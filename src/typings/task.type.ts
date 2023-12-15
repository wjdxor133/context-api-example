import { DropResult } from "@hello-pangea/dnd";

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

export interface AllTaskContextProps {
  allTask: AllTaskType;
  updatedTaskBoard: (updatedTasks: AllTaskType) => void;
  addTaskCard: (updatedTasks: AllTaskType) => void;
  editTaskCard: (updatedTasks: AllTaskType) => void;
  addTaskList: (updatedTaskList: AllTaskType) => void;
  dragEndTaskCard: (result: DropResult) => void;
}
