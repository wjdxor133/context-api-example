import { useContext } from "react";
import { TaskContext } from "providers/ContextProvider";
import { Container, Grid } from "@radix-ui/themes";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskList from "@components/TaskList";
import AddTaskButton from "@components/AddTaskButton";

function TaskPage() {
  const {
    allTask: { lists, listId },
    dragEndTaskItem,
  } = useContext(TaskContext);

  return (
    <Container size="4">
      <DragDropContext onDragEnd={dragEndTaskItem}>
        <Droppable droppableId="all-task" type="list" direction="horizontal">
          {(provided) => (
            <Grid
              columns="4"
              gap="3"
              width="auto"
              height="auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <>
                {listId.map((id, index) => {
                  return (
                    <TaskList
                      key={id}
                      id={id}
                      lists={lists[id]}
                      index={index}
                    />
                  );
                })}
                {listId.length < 4 && <AddTaskButton />}
                {provided.placeholder}
              </>
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default TaskPage;
