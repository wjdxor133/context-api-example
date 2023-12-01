import TaskPage from "@pages/TaskPage";
import ContextProvider from "@providers/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <TaskPage />
    </ContextProvider>
  );
}

export default App;
