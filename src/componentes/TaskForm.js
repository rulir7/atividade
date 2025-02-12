import React, { useState, useContext } from "react";
import { TaskContext } from "../App";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const { setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    const newTaskObj = { id: Date.now(), title: newTask, completed: false };
    setTasks((prev) => [...prev, newTaskObj]);
    setNewTask("");
    navigate("/tasks");
  };

  return (
    <div className="container mt-4">
      <input
        className="form-control mb-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn btn-success" onClick={addTask}>
        Adicionar
      </button>
    </div>
  );
}

export default TaskForm;
