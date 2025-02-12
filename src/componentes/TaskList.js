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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tarefa</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              setTasks={setTasks}
              index={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
