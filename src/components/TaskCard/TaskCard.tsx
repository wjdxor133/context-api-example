import { Card } from "@providers/ContextProvider";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";

interface TaskCardProps {
  card: Card;
}

function TaskCard({ card }: TaskCardProps) {
  return (
    <Box>
      {card && (
        <Flex
          direction="row"
          justify="between"
          align="center"
          style={{
            backgroundColor: "var(--gray-a2)",
            borderRadius: "12px",
          }}
        >
          <IconButton>
            <ArrowLeftIcon />
          </IconButton>
          <Text>{card.title}</Text>
          <IconButton>
            <ArrowRightIcon />
          </IconButton>
        </Flex>
      )}
    </Box>
  );
}

export default TaskCard;
