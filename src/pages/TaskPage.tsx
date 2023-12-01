import { TaskContext } from "providers/ContextProvider";
import { useContext } from "react";
import TaskList from "@components/TaskList";
import { Container, Grid } from "@radix-ui/themes";
import AddTaskButton from "@components/AddTaskButton";

function TaskPage() {
  const {
    allTask: { lists, listId },
  } = useContext(TaskContext);

  return (
    <Container size="4">
      <Grid columns="4" gap="3" width="auto" height="auto">
        {listId.map((id) => {
          return <TaskList key={id} id={id} lists={lists[id]} />;
        })}
        <AddTaskButton />
      </Grid>
    </Container>
  );
}

export default TaskPage;
