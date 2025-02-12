import React, { useState } from "react";

function TaskItem({ task, setTasks }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const toggleTask = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title: editedTitle } : t))
    );
    setIsEditing(false);
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={() => setShowDetails(!showDetails)}
    >
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
      {showDetails && (
        <div className="ms-3">
          <p className="mb-1">
            <strong>Status:</strong> {task.completed ? "Concluída" : "Pendente"}
          </p>
          {isEditing ? (
            <button className="btn btn-sm btn-primary" onClick={saveEdit}>
              Salvar
            </button>
          ) : (
            <button
              className="btn btn-sm btn-warning"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
          <button className="btn btn-sm btn-danger ms-2" onClick={deleteTask}>
            Deletar
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
