import React, { useState } from "react";
import "../css/Task.css";
import "../css/scrollbar.css";
import editIcon from "../assets/icons/edit.svg";
import Date from "../components/Date";
import { GlobalContext } from "../App";
import { useContext } from "react";

function Task({ id, text, date}) {
  const { popUpList } = useContext(GlobalContext);
  const { popUpOptions, togglePopUp } = popUpList;
  
  const [isTaskHovered, setIsTaskHovered] = useState(false);

  return (
    <div>
      <Date id="task-date" taskDate={date} />
      <div 
        className="task-container"
        onMouseEnter={()=> setIsTaskHovered(true)}
        onMouseLeave={()=> setIsTaskHovered(false)}
      >
        <div className="task-title">
          <p className="task-input">{text}</p>
        </div>
        {isTaskHovered && (
          <img
            className="task-edit"
            src={editIcon}
            alt="Edit icon"
            onClick={() => {
              togglePopUp(popUpOptions.EDIT);
            }}
          ></img>
        )}
        <div className="task-delete"></div>
      </div>
    </div>
  );
}
export default Task;

/*const openEditPopUp = () => {
    const overlay = document.querySelector(".overlay");

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
  };*/