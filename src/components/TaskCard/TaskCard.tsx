import {
  Box,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Draggable } from "@hello-pangea/dnd";
import { AllTaskType, CardType, ListsType } from "@typings/task.type";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "@providers/ContextProvider";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useOutsideClick } from "@hooks/useOutsideClick";

interface TaskCardProps {
  listsId: string;
  card: CardType;
  index: number;
}

function TaskCard({ listsId, card, index }: TaskCardProps) {
  const { allTask, editTaskCard, updatedTaskBoard } = useContext(TaskContext);
  const [title, setTitle] = useState(card.title);
  const [isEdit, setIsEdit] = useState(false);

  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const outsideRef = useOutsideClick((event) => {
    const target = event.target as HTMLElement | null;

    if (target && target.textContent !== "삭제") {
      setIsEdit(false);
    }
  });

  useEffect(() => {
    if (isEdit && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [isEdit]);

  const handleTaskCardEditEnable = () => {
    setIsEdit(true);
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

  const handleRemoveTaskCard = () => {
    const removedTaskCard = {
      ...allTask.lists[listsId],
      cards: allTask.lists[listsId].cards.filter((item) => {
        return item.id !== card.id;
      }),
    };
    const updatedLists = { ...allTask.lists, [listsId]: removedTaskCard };
    const updatedAllTask = { ...allTask, lists: updatedLists };

    updatedTaskBoard(updatedAllTask as AllTaskType);
    setIsEdit(false);
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
            <Box
              ref={outsideRef}
              width="100%"
              onClick={handleTaskCardEditEnable}
              style={{
                cursor: "pointer",
              }}
            >
              {isEdit ? (
                <TextField.Root>
                  <TextField.Input
                    ref={taskInputRef}
                    size="2"
                    placeholder="입력해주세요."
                    value={title}
                    onChange={handleEditTaskCard}
                  />
                  <TextField.Slot pr="3">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <IconButton size="1" variant="ghost">
                          <DotsHorizontalIcon width="16" height="16" />
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content onClick={handleRemoveTaskCard}>
                        <DropdownMenu.Item>삭제</DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </TextField.Slot>
                </TextField.Root>
              ) : (
                <Flex justify="between" align="center" p="1">
                  <Text>{title}</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
