import React, { useState } from "react";
import { format } from "date-fns";

function TaskItem({ task, setTasks, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const toggleTask = () => {
    const completedAt = !task.completed ? new Date().toISOString() : null;
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed, completedAt }),
    }).then(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed, completedAt } : t
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy HH:mm:ss");
  };

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <input
          type="checkbox"
          className="form-check-input me-2"
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
      </td>
      <td>
        <button
          className="btn btn-sm btn-info me-2"
          onClick={() =>
            alert(
              `Tarefa: ${task.title}\nStatus: ${
                task.completed ? "Concluída" : "Pendente"
              }\nData de Criação: ${formatDate(
                task.createdAt
              )}\nData de Conclusão: ${
                task.completedAt ? formatDate(task.completedAt) : "N/A"
              }`
            )
          }
        >
          Detalhes
        </button>
        {isEditing ? (
          <button className="btn btn-sm btn-primary me-2" onClick={saveEdit}>
            Salvar
          </button>
        ) : (
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}
        <button className="btn btn-sm btn-danger" onClick={deleteTask}>
          Deletar
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
