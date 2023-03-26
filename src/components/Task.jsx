import React, { useEffect, useState } from "react";
import "../css/Task.css";
import "../css/scrollbar.css";
import editIcon from "../assets/icons/edit.svg";
import Date from "../components/Date";
import PopUp from "./PopUp";

function Task({
  taskId,
  taskInput,
  taskDate,
  emptyTask,
  emptyTaskConfig,
  saveTasksArray,
  editTasksArray,
}) {
  const [currentTask, setCurrentTask] = useState();
  const [taskText, setTaskText] = useState("");

  const currentTaskContainer = (taskContainer) => {
    setCurrentTask(taskContainer);
  };

  const updateTaskText = (text) => {
    setTaskText(text);
  };

  const addActiveClass = (e, task) => {
    e.stopImmediatePropagation();
    task.querySelector(".task-edit").classList.add("active");
  };
  const removeActiveClass = (e, task) => {
    e.stopImmediatePropagation();
    task.querySelector(".task-edit").classList.remove("active");
  };

  const setPopUp = (e, taskEdit) => {
    e.stopImmediatePropagation();

    currentTaskContainer(taskEdit.parentElement);

    //* Obtener el texto de la tarea a editar
    let text = taskEdit.parentElement.querySelector(".task-input").innerHTML;
    updateTaskText(text);

    openEditPopUp();
  };

  //* Efecto 1: Activa y desactiva el botón de edición del componente
  useEffect(() => {
    const taskContainer = document.querySelectorAll(".task-container");

    taskContainer.forEach((task) => {
      task.addEventListener("mouseenter", (e) => addActiveClass(e, task));
      task.addEventListener("mouseleave", (e) => removeActiveClass(e, task));
    });

    taskContainer.forEach((taskContainer) => {
      const taskEditBtn = taskContainer.querySelectorAll(".task-edit");
      taskEditBtn.forEach((taskEdit) => {
        taskEdit.addEventListener("click", (e) => setPopUp(e, taskEdit));
      });
    });

    return () => {
      taskContainer.forEach((task) => {
        task.removeEventListener("mouseenter", (e) => addActiveClass(e, task));
        task.removeEventListener("mouseleave", (e) =>
          removeActiveClass(e, task)
        );
      });
      taskContainer.forEach((taskContainer) => {
        const taskEditBtn = taskContainer.querySelectorAll(".task-edit");
        taskEditBtn.forEach((taskEdit) => {
          taskEdit.removeEventListener("click", (e) => setPopUp(e, taskEdit));
        });
      });
    };
  });

  const openEditPopUp = () => {
    const overlay = document.querySelector(".overlay");
    const editPopUp = document.getElementById("edit-popup");
    const popUp = document.querySelector(".popup");

    const currentCenterPos =
      ((window.scrollY + window.innerHeight / 2) /
        document.documentElement.scrollHeight) *
      document.documentElement.scrollHeight;

    //* Centrar popUp en pantalla
    popUp.style.top = `${currentCenterPos}px`;
    //* Visibiliza la capa oscura y setea el ancho sin contar el scrollbar
    overlay.style.visibility = "visible";
    overlay.style.width = `${document.body.clientWidth}px`;
    //* Muestra la ventana de Edit
    editPopUp.style.display = "flex";
  };

  return (
    <div>
      <div style={emptyTaskConfig}>
        <Date id="task-date" taskDate={taskDate} />
        <div className="task-container">
          <div className="task-title">
            <p className="task-input">{taskInput}</p>
          </div>
          <img className="task-edit" src={editIcon} alt="Edit icon"></img>
          <div className="task-delete"></div>
        </div>

        {emptyTask && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          ></div>
        )}
      </div>

      <div className="overlay"></div>
      <PopUp
        popUpType="edit-popup"
        currentTaskContainer={currentTask}
        taskId={taskId}
        taskText={taskText}
        taskDate={taskDate}
        updateTaskText={updateTaskText}
        editTasksArray={editTasksArray}
      />
      <PopUp
        popUpType="add-popup"
        updateTaskText={updateTaskText}
        saveTasksArray={saveTasksArray}
      />
    </div>
  );
}
export default Task;
