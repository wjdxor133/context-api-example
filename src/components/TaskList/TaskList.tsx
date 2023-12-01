import { useContext } from "react";
import TaskCard from "@components/TaskCard";
import {
  AllTaskType,
  Card,
  List,
  Lists,
  TaskContext,
} from "@providers/ContextProvider";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

interface TaskListProps {
  id: string;
  lists: List;
}

function TaskList({ id, lists }: TaskListProps): JSX.Element {
  const { allTask, addTaskCard } = useContext(TaskContext);
  const { title, cards } = lists;

  const handleAddTaskCard = () => {
    const input = prompt("할일을 입력해주새요", "");
    const newCard = {
      id: uuid(),
      title: input ?? "",
    };

    const addCardToSpecificList = (
      lists: Lists,
      listId: string,
      newCard: Card
    ) => {
      const updatedList = {
        ...lists[listId],
        cards: [...lists[listId].cards, newCard],
      };

      return { ...lists, [listId]: updatedList };
    };

    const updatedLists = addCardToSpecificList(allTask.lists, id, newCard);
    const updatedAllTask = { ...allTask, lists: updatedLists };

    addTaskCard(updatedAllTask as AllTaskType);
  };

  return (
    <Flex
      direction="column"
      width="auto"
      height="auto"
      p="4"
      style={{
        border: "solid 2px GrayText",
        borderRadius: "12px",
      }}
    >
      <Heading size="5" align="center">
        {title}
      </Heading>
      <Flex direction="column" gap="4" mt="4">
        {cards.map((card) => {
          return <TaskCard key={card.id} card={card} />;
        })}
        <Button onClick={handleAddTaskCard}>+ 추가</Button>
      </Flex>
    </Flex>
  );
}

export default TaskList;
