import React, { useState } from "react";
import "../css/Task.css";
import "../css/scrollbar.css";
import editIcon from "../assets/icons/edit.svg";
import { GlobalContext } from "../App";
import { useContext } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

function Task({ id, selectedTasksState }) {
  const { popUpList, tasksArrayState, selectedTaskIdState, removeStatusState} = useContext(GlobalContext);
  const { tasksArray } = tasksArrayState;
  const { setSelectedTaskId } = selectedTaskIdState;
  const { popUpOptions, togglePopUp } = popUpList;
  const { selectedTasks, setSelectedTasks} = selectedTasksState;
  
  //* Rendering states
  const [isTaskHovered, setIsTaskHovered] = useState(false);
  const { removeStatus } = removeStatusState;
  const [isTaskSelected, setIsTaskSelected] = useState(false);

  const currentTask = (tasksArray.find((task)=>{
    if(id === task.id){
      return task;
    }
    return null;
  }))

  
  const addSelectedTask = (currentTask) =>{
    setSelectedTasks([currentTask, ...selectedTasks]);
  }
  const removeSelectedTask = (currentTask) =>{
    let tasks = [...selectedTasks];
    tasks = tasks.filter( task => task.id !== currentTask.id);
    
    setSelectedTasks(tasks);
  }

  return (
    <div>
      <div 
        className="task-container"
        onMouseEnter={()=> setIsTaskHovered(true)}
        onMouseLeave={()=> setIsTaskHovered(false)}
      >
        <div className="task-title">
          <p className="task-input">{currentTask ? currentTask.text : <strong><i>(Hubo un error)</i></strong>}</p>
        </div>
        {(isTaskHovered && !removeStatus) && (
          <img
            className="task-edit"
            src={editIcon}
            alt="Edit icon"
            onClick={() => {
              setSelectedTaskId(id);
              togglePopUp(popUpOptions.EDIT);
            }}
          ></img>
        )}
        {(removeStatus && !isTaskSelected) && (
          <div className="task-select-container">
            <MdCheckBoxOutlineBlank 
              className="checkbox"
              onClick={() => {
                addSelectedTask(currentTask);
                setIsTaskSelected(true);
              }}
            />
          </div>
        )}
        {(removeStatus && isTaskSelected) && (
          <div className="task-select-container">
            <MdCheckBox 
              className="checkbox"
              onClick={() => {
                removeSelectedTask(currentTask);
                setIsTaskSelected(false);
              }}
            />
          </div>
        )}
        
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
