import React, { useState } from "react";

function TaskItem({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const toggleTask = () => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    });
  };

  const deleteTask = () => {
    fetch(`http://localhost:3000/tasks/${task.id}`, { method: "DELETE" }).then(
      () => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      }
    );
  };

  const saveEdit = () => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editedTitle }),
    }).then(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, title: editedTitle } : t))
      );
      setIsEditing(false);
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input
        type="checkbox"
        className="form-check-input"
        checked={task.completed}
        onChange={toggleTask}
      />
      {isEditing ? (
        <input
          className="form-control"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <span>{task.title}</span>
      )}
      <button
        className="btn btn-sm btn-info ms-2"
        onClick={() =>
          alert(
            `Tarefa: ${task.title}\nStatus: ${
              task.completed ? "Concluída" : "Pendente"
            }`
          )
        }
      >
        Detalhes
      </button>
      {isEditing ? (
        <button className="btn btn-sm btn-primary ms-2" onClick={saveEdit}>
          Salvar
        </button>
      ) : (
        <button
          className="btn btn-sm btn-warning ms-2"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </button>
      )}
      <button className="btn btn-sm btn-danger ms-2" onClick={deleteTask}>
        Deletar
      </button>
    </li>
  );
}

export default TaskItem;
