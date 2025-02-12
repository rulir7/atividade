import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-primary text-white p-3 mb-3 text-center">
      <h1>Lista de Tarefas</h1>
      <nav>
        <Link to="/" className="btn btn-light m-2">
          Adicionar Tarefa
        </Link>
        <Link to="/tasks" className="btn btn-light">
          Ver Tarefas
        </Link>
      </nav>
    </header>
  );
}

export default Header;
