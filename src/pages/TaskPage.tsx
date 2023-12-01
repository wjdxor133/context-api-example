import { useContext } from "react";
import { TaskContext } from "providers/ContextProvider";
import { Container, Grid } from "@radix-ui/themes";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskList from "@components/TaskList";
import AddTaskButton from "@components/AddTaskButton";

function TaskPage() {
  const {
    allTask: { lists, listId },
    dragEndTaskCard,
  } = useContext(TaskContext);

  return (
    <Container size="4">
      <Grid columns="4" gap="3" width="auto" height="auto">
        <DragDropContext onDragEnd={dragEndTaskCard}>
          {listId.map((id) => {
            return <TaskList key={id} id={id} lists={lists[id]} />;
          })}
          <AddTaskButton />
        </DragDropContext>
      </Grid>
    </Container>
  );
}

export default TaskPage;
