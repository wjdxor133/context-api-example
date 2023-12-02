import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { Draggable } from "@hello-pangea/dnd";
import { CardType } from "@typings/task.type";

interface TaskCardProps {
  card: CardType;
  index: number;
}

function TaskCard({ card, index }: TaskCardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Flex
            direction="row"
            justify="between"
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
            <Text>{card.title}</Text>
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
