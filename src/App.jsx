import "./App.css";
import TaskForms from "./components/TaskForms";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <div className="w-full sm:max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 pt-16">Task Manager</h1>
        <TaskForms />
        <TaskList />
      </div>
    </>
  );
}

export default App;
