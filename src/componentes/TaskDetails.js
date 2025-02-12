import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function TaskDetails({ tasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === id);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy HH:mm:ss");
  };

  if (!task) {
    return <div className="alert alert-danger">Tarefa não encontrada</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Detalhes da Tarefa</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Tarefa:</strong> {task.title}
          </p>
          <p className="card-text">
            <strong>Status:</strong> {task.completed ? "Concluída" : "Pendente"}
          </p>
          <p className="card-text">
            <strong>Data de Criação:</strong> {formatDate(task.createdAt)}
          </p>
          <p className="card-text">
            <strong>Data de Conclusão:</strong>{" "}
            {task.completedAt ? formatDate(task.completedAt) : "N/A"}
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/tasks")}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
