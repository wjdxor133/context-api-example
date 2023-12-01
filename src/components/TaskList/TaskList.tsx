import { useContext } from "react";
import TaskCard from "@components/TaskCard";
import {
  AllTaskType,
  CardType,
  ListType,
  ListsType,
  TaskContext,
} from "@providers/ContextProvider";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";
import { Droppable } from "@hello-pangea/dnd";

interface TaskListProps {
  id: string;
  lists: ListType;
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
      lists: ListsType,
      listId: string,
      newCard: CardType
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
    <Card size="1">
      <Flex direction="column" width="auto" height="auto" gap="3">
        <Heading size="5" align="center">
          {title}
        </Heading>
        <Droppable droppableId={lists.id}>
          {(provided) => {
            return (
              <>
                <Flex
                  direction="column"
                  gap="4"
                  mt="4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cards.map((card, index) => {
                    return (
                      card && (
                        <TaskCard key={card.id} card={card} index={index} />
                      )
                    );
                  })}
                </Flex>
                {provided.placeholder}
              </>
            );
          }}
        </Droppable>
        <Button onClick={handleAddTaskCard}>+ 항목 추가</Button>
      </Flex>
    </Card>
  );
}

export default TaskList;
