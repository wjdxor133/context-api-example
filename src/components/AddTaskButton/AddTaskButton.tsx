import { useContext } from "react";
import { TaskContext } from "@providers/ContextProvider";
import { Button } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

function AddTaskButton(): JSX.Element {
  const { allTask, addTaskList } = useContext(TaskContext);

  const handleAddTaskList = () => {
    const input = prompt("목록을 이름을 입력해주새요", "");

    const newListId = uuid();
    const newList = {
      id: newListId,
      title: input ?? "",
      cards: [],
    };

    const newAllTask = {
      listId: [...allTask.listId, newListId],
      lists: {
        ...allTask.lists,
        [newListId]: newList,
      },
    };

    addTaskList(newAllTask);
  };

  return <Button onClick={handleAddTaskList}>+ 목록 추가</Button>;
}

export default AddTaskButton;
