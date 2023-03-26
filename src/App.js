import "./App.css";
import "./css/scrollbar.css";
import Date from "./components/Date.jsx";
import Add from "./components/Add";
import Remove from "./components/Remove";
import Task from "./components/Task";
import MenuIcon from "./assets/icons/menu.svg";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  //* Inicialización de array de tasks para el localStorage
  const task = {
    title: "",
    date: "",
    id: "0"
  };
  const [tasksArray, setTasksArray] = useState([task]);

  //* Lista de tareas que se representa en el DOM
  const [taskList, setTaskList] = useState([]);
  
  const saveTasksArray = (newTask) =>{
    let newTasksArray = [newTask, ...tasksArray];

    //* Filtra por fechas mas recientes
    newTasksArray.sort((a,b)=> (a.date > b.date ? 1 : -1));

    setTasksArray(newTasksArray);

    localStorage.setItem("tasks", JSON.stringify(newTasksArray));
  }
  const editTasksArray = (editedTaskArray) =>{
    setTasksArray(editedTaskArray);

    localStorage.setItem("tasks", JSON.stringify(editedTaskArray));
  }

  const autoSetTaskList = (tasks) => {
    setTaskList(tasks);
  };

  useEffect(() => {
    //* Obtiene el array de tasks. Si no existe se crea un array de tasks nuevo.
    const tasks =
      JSON.parse(localStorage.getItem("tasks")) ||
      localStorage.setItem("tasks", JSON.stringify(tasksArray));
    
    autoSetTaskList(tasks);
  }, [tasksArray]);

  return (
    <div className="App">
      <section className="tasklist-container">
        <div className="title-container">
          <h1 className="title">Task list</h1>
          <Date id="currentDate" />
        </div>
        <div className="taskmanager-container">
          <img src={MenuIcon} alt="Menu"></img>
          <div>
            <Remove />
            <Add />
          </div>
        </div>
        <div className="all-tasks">
          {taskList.map((task) => {
            //* Debe existir al menos un task para poder abrir el add pop-up
            //* por lo que traslado el task vacio a otro lugar para que no se vea
            let emptyTaskConfig = {};
            let emptyTask = false;
            if (task.title === '' || task.date === '') {
              emptyTaskConfig = {
                position: "absolute",
                top: "0",
                left: "0",
                opacity: "0",
              };
              emptyTask = true;
            }

            return (
              <Task
                key={uuidv4()}
                taskId={task.id}
                taskInput={task.title}
                taskDate={task.date}
                emptyTask={emptyTask}
                emptyTaskConfig={emptyTaskConfig}
                saveTasksArray={saveTasksArray}
                editTasksArray={editTasksArray}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;