import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./componentes/Header";
import TaskForm from "./componentes/TaskForm";
import TaskList from "./componentes/TaskList";
import TaskDetails from "./componentes/TaskDetails";

const TaskContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, filter, setFilter }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </Router>
    </TaskContext.Provider>
  );
}

export default App;
export { TaskContext };
