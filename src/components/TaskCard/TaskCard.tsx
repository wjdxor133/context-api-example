import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { Draggable } from "@hello-pangea/dnd";
import { AllTaskType, CardType, ListsType } from "@typings/task.type";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "@providers/ContextProvider";

interface TaskCardProps {
  listsId: string;
  card: CardType;
  index: number;
}

function TaskCard({ listsId, card, index }: TaskCardProps) {
  const { allTask, editTaskCard } = useContext(TaskContext);
  const [title, setTitle] = useState(card.title);
  const [isEdit, setIsEdit] = useState(false);

  const taskInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdit && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [isEdit]);

  const handleTaskCardEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const handleEditTaskCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);

    const editCardToSpecificList = (lists: ListsType, listId: string) => {
      const updatedList = {
        ...lists[listId],
        cards: lists[listId].cards.map((item) => {
          return card.id === item.id ? { ...item, title: value } : item;
        }),
      };

      return { ...lists, [listId]: updatedList };
    };

    const updatedLists = editCardToSpecificList(allTask.lists, listsId);
    const updatedAllTask = { ...allTask, lists: updatedLists };

    editTaskCard(updatedAllTask as AllTaskType);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Flex
            direction="row"
            gap="4"
            align="center"
            style={{
              backgroundColor: "var(--gray-a2)",
              borderRadius: "12px",
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>
            <Box
              width="100%"
              onClick={handleTaskCardEditToggle}
              onBlur={handleTaskCardEditToggle}
              style={{
                cursor: "pointer",
              }}
            >
              {isEdit ? (
                <TextField.Input
                  ref={taskInputRef}
                  size="2"
                  placeholder="입력해주세요."
                  value={title}
                  onChange={handleEditTaskCard}
                />
              ) : (
                <Text>{title}</Text>
              )}
            </Box>
            <IconButton>
              <ArrowRightIcon />
            </IconButton>
          </Flex>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
