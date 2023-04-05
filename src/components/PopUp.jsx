import React, { useContext, useState } from "react";
import ExitIcon from "../assets/icons/exit.svg";
import "../css/popup.css";
import SaveBtn from "../assets/icons/saveBtn.svg";
import "../css/scrollbar.css";
import { GlobalContext } from "../App";

import { v4 as uuidv4 } from "uuid";

function PopUp({ popUpType }) {
  const isEditSection = popUpType === "edit-popup";
  //* Context
  const {currentDate, popUpList, tasksArrayState} = useContext(GlobalContext);
  //* Rendering states
  const {popUpOptions, togglePopUp, popUpIsClosingState} = popUpList;
  const {popUpIsClosing, setPopUpIsClosing} = popUpIsClosingState;
  
  //* Task states
  const {tasksArray, setTasksArray} = tasksArrayState;
  const [popUpTaskText, setPopUpTaskText]= useState('');
  const [popUpDate, setPopUpDate]= useState(currentDate);

  //* Task actions
  const taskActions = {
    save: ()=>{
      const updatedTasksArray = [...tasksArray];

      const taskId = uuidv4();

      const newTask = {
        text: popUpTaskText,
        date: popUpDate,
        id: taskId,
      }
      updatedTasksArray.push(newTask);
      
      setTasksArray(updatedTasksArray);
      
      console.log("guardado");
      closePopUp();
    },
    edit: ()=>{
      console.log("editado");
    }
  }

  //* PopUp UI -> Closing
  const closePopUp = () => {
    setPopUpIsClosing(true);
    const popUpType = isEditSection ? popUpOptions.EDIT : popUpOptions.ADD;
    
    setTimeout(() => {
      togglePopUp(popUpType);
      setPopUpIsClosing(false);
    }, 150);
  }

  return (
    <div className={`popup ${popUpIsClosing ? 'popup-close' : '' }`} id={popUpType}>
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
          onChange={(e)=> setPopUpTaskText(e.target.value)}
        ></textarea>
        <div className="popup-date-container">
          <label htmlFor="date">
            <p>Date:</p>
            <input
              className="popup-date"
              type="date"
              name="date"
              defaultValue={isEditSection ? '1990-12-27' : currentDate}
              onChange={(e)=> setPopUpDate(e.target.value)}
            ></input>
            <div style={{ width: "40px" }}></div>
          </label>
        </div>
        <button className="popup-save-container">
          <p>Done</p>
          <img 
            className="popup-save" 
            src={SaveBtn} 
            alt=""
            onClick={isEditSection ? taskActions.edit : taskActions.save}
          ></img>
        </button>
      </div>
    </div>
  );
}
export default PopUp;
