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
  const {
    currentDate,
    popUpList,
    tasksArrayState,
    selectedTaskIdState,
    showErrorMsg,
    showSuccessMsg
  } = useContext(GlobalContext);
  
  //* Rendering states
  const { popUpOptions, togglePopUp, popUpIsClosingState } = popUpList;
  const { popUpIsClosing, setPopUpIsClosing } = popUpIsClosingState;

  //* Task states
  const { tasksArray, setTasksArray } = tasksArrayState;
  const { selectedTaskId } = selectedTaskIdState;

  //* Get the task to be edited
  let toBeEditedTask = null;
  if (isEditSection && selectedTaskId != null) {
    toBeEditedTask = tasksArray.find((task) => {
      return task.id === selectedTaskId;
    });
  }
  const [popUpTaskText, setPopUpTaskText] = useState(
    isEditSection ? toBeEditedTask.text : ""
  );
  const [popUpDate, setPopUpDate] = useState(
    isEditSection ? toBeEditedTask.date : currentDate
  );
  //--

  //* Task actions
  const taskActions = {
    save: () => {
      console.log("Save ejecutado");
      if (popUpTaskText !== "" && popUpDate !== null) {
        if (isDateValid()) {
          const updatedTasksArray = [...tasksArray];

          const taskId = uuidv4();

          const newTask = {
            text: popUpTaskText,
            date: popUpDate,
            id: taskId,
          };
          updatedTasksArray.push(newTask);

          setTasksArray(updatedTasksArray);
          showSuccessMsg("Saved successfully!");
          closePopUp();
        } else {
          showErrorMsg("date is not valid.");
        }
      } else {
        showErrorMsg("fields can't be empty.");
      }
    },
    edit: () => {
      console.log("Edit ejecutado");
      if (popUpTaskText !== "" && popUpDate !== null) {
        if (isDateValid()) {
          let updatedTasksArray = [...tasksArray];

          //* Filter the array excluding the task to be edited
          updatedTasksArray = updatedTasksArray.filter(
            (task) => task.id !== selectedTaskId
          );

          //* Save the edited task
          const editedTask = {
            text: popUpTaskText,
            date: popUpDate,
            id: selectedTaskId,
          };
          updatedTasksArray.push(editedTask);

          setTasksArray(updatedTasksArray);
          showSuccessMsg("Saved successfully!");
          closePopUp();
        } else {
          showErrorMsg("date is not valid.");
        }
      } else {
        showErrorMsg("fields can't be empty.");
      }
    },
  };

  const isDateValid = () => {
    let isDateValid = false;
    if (new Date(popUpDate) - new Date(currentDate) >= 0) {
      isDateValid = true;
    }

    return isDateValid;
  };

  //* PopUp UI -> Closing
  const closePopUp = () => {
    setPopUpIsClosing(true);
    const popUpType = isEditSection ? popUpOptions.EDIT : popUpOptions.ADD;

    setTimeout(() => {
      togglePopUp(popUpType);
      setPopUpIsClosing(false);
    }, 150);
  };

  return (
    <div
      className={`popup ${popUpIsClosing ? "popup-close" : ""}`}
      id={popUpType}
    >
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
          defaultValue={isEditSection ? toBeEditedTask.text : ""}
          onChange={(e) => setPopUpTaskText(e.target.value)}
        ></textarea>
        <div className="popup-date-container">
          <label htmlFor="date">
            <p>Date:</p>
            <input
              className="popup-date"
              type="date"
              name="date"
              defaultValue={isEditSection ? toBeEditedTask.date : currentDate}
              onChange={(e) => setPopUpDate(e.target.value)}
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
