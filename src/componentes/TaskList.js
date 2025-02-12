import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../App";

function TaskList() {
  const { tasks, setTasks, filter, setFilter } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
      </div>
      <ul className="list-group">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} setTasks={setTasks} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
