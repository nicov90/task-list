import React, { useState } from "react";
import ExitIcon from "../assets/icons/exit.svg";
import "../css/popup.css";
import SaveBtn from "../assets/icons/saveBtn.svg";
import "../css/scrollbar.css";
import { v4 as uuidv4 } from "uuid";

function PopUp({ popUpType, taskId, taskText, taskDate, updateTaskText, saveTasksArray, editTasksArray}) {
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const currentDate = new Date()
    .toLocaleDateString("en-GB", dateOptions)
    .split("/")
    .reverse()
    .join("-");

  const isEditSection = popUpType === "edit-popup";
  const [popUpTaskText, setPopUpTaskText] = useState("");

  const closePopUp = () => {
    const popUp = document.getElementById(popUpType);
    const overlay = document.querySelector(".overlay");

    //* Ejecuta la animación de cierre
    popUp.classList.add("popup-close");
    //* Oculta capa oscura
    overlay.style.visibility = "hidden";

    setTimeout(() => {
      popUp.style.display = "none";
      //* Quita el estado de animación de cierre
      popUp.classList.remove("popup-close");
    }, 150);
  };

  const handleTextValue = (event) => {
    let currentTaskText = event.target.value;

    setPopUpTaskText(currentTaskText);
    updateTaskText(currentTaskText);
  };

  const saveTask = () => {
    if (isEditSection) {
      // EDITAR
      const popUp = document.getElementById(popUpType);
      const popUpDate = popUp.querySelector(".popup-date").value;

      const tasksArray = JSON.parse(localStorage.getItem("tasks"));
      const taskElementIndex = tasksArray.findIndex(
        storageTask => storageTask.id === taskId
      );
      //* Editar tarea
      if (popUpTaskText !== "" && popUpDate !== "") {
        let taskElementToEdit = tasksArray[taskElementIndex];
        taskElementToEdit.title = popUpTaskText;
        taskElementToEdit.date = popUpDate;

        //* Reemplazar tarea en el tasksArray
        tasksArray[taskElementIndex] = taskElementToEdit;

        //* Subir el tasksArray actualizado al localStorage
        editTasksArray(tasksArray);
      } else {
        alert("No puede haber un campo vacío");
      }
    } else {
      // GUARDAR
      const popUp = document.getElementById(popUpType);
      const popUpDate = popUp.querySelector(".popup-date").value;

      if (popUpTaskText !== "" && popUpDate !== "") {
        let newTask = {
          title: popUpTaskText,
          date: popUpDate,
          id: uuidv4(),
        };
        saveTasksArray(newTask);
      } else {
        alert("No puede haber un campo vacío");
      }
    }
  };

  return (
    <div className="popup" id={popUpType}>
      <div className="exit-container">
        <img
          className="exit-btn"
          src={ExitIcon}
          alt=""
          onClick={closePopUp}
        ></img>
      </div>
      <div className="popup-container">
        <div className="popup-title-container">
          <h1 className="popup-title">{isEditSection ? "Edit" : "Add"}</h1>
        </div>
        <textarea
          className="popup-input"
          placeholder="Add text..."
          defaultValue={taskText}
          onChange={handleTextValue}
        ></textarea>
        <div className="popup-date-container">
          <label htmlFor="date">
            <p>Date:</p>
            <input
              className="popup-date"
              type="date"
              name="date"
              defaultValue={isEditSection ? taskDate : currentDate}
            ></input>
            <div style={{ width: "40px" }}></div>
          </label>
        </div>
        <button className="popup-save-container" onClick={saveTask}>
          <p>Done</p>
          <img className="popup-save" src={SaveBtn} alt=""></img>
        </button>
      </div>
    </div>
  );
}
export default PopUp;
