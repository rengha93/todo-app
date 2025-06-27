import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
  setSearchStatus,
  setFilterStatus,
  toggleComplete,
} from "../redux/features/taskSlice";
import { useState } from "react";

export default function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  const handleEditToggleOrSave = (task) => {
    if (editId === task.id) {
      if (editText.trim()) {
        dispatch(
          editTask({
            id: task.id,
            newText: editText.trim(),
          })
        );
      }
      setEditId(null);
      setEditText("");
    } else {
      setEditId(task.id);
      setEditText(task.text);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter.status === "completed") return task.completed;
      if (filter.status === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(filter.search.toLowerCase())
    );

  return (
    <div>
      {/*search input */}
      <input
        type="text"
        placeholder="Search for a task"
        value={filter.search}
        onChange={(e) => dispatch(setSearchStatus(e.target.value))}
        className="w-full border rounded p-2 mb-4"
      />

      <ul className="space-y-2">
        {tasks.length === 0 && <p> No Tasks Found!!</p>}

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {["all", "completed", "pending"].map((status) => (
            <button
              onClick={() => dispatch(setFilterStatus(status))}
              className={`w-full sm:w-auto px-5 py-2 rounded border ${
                filter.status === status ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List*/}
        {Array.isArray(tasks) &&
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border rounded px-2"
                  checked={task.completed}
                  onChange={(e) => dispatch(toggleComplete(task.id))}
                />
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border rounded px-2"
                  />
                ) : (
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : "w-full overflow-hidden line-clamp-2 break-words whitespace-normal"
                    }
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditToggleOrSave(task)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {editId === task.id ? "Save" : "Edit"}
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
