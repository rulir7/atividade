import React, { useState, useContext } from "react";
import { TaskContext } from "../App";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const { setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    const newTaskObj = { title: newTask, completed: false };
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskObj),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks((prev) => [...prev, task]);
        setNewTask("");
        navigate("/tasks");
      });
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
