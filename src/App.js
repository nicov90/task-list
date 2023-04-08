import React, { createContext, useState } from "react";
import "./App.css";
import "./css/scrollbar.css";
import arrowUp from "./assets/arrowup.png";
import AddUI from "./components/AddUI";
import Remove from "./components/Remove";
import { MainUI } from "./components/MainUI";
import { MainTitle } from "./components/MainTitle";
import { TaskManager } from "./components/TaskManager";
import AllTasks from "./components/AllTasks";
import Overlay from "./components/Overlay";
import Task from "./components/Task";
import PopUp from "./components/PopUp";
import useLocalStorage from "./js/useLocalStorage";
import Alert from "react-bootstrap/Alert";
import DateUI from "./components/DateUI";

export const GlobalContext = createContext();

function App() {
  //* Get current date
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const currentDate = new Date()
    .toLocaleDateString("en-GB", dateOptions)
    .split("/")
    .reverse()
    .join("-");

  //* Rendering states
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [popUpIsClosing, setPopUpIsClosing] = useState(false);
  const [deleteOptionsIsClosing, setDeleteOptionsIsClosing] = useState(false);

  const [removeStatus, setRemoveStatus] = useState(false);
  const removeStatusState = {
    removeStatus,
    setRemoveStatus,
  };

  //* Error states
  const [errorStatus, setErrorStatus] = useState(false);
  const errorStatusState = {
    errorStatus,
    setErrorStatus,
  };
  const [errorMessage, setErrorMessage] = useState("Error");

  const [successStatus, setSuccessStatus] = useState(false);
  const successStatusState = {
    successStatus,
    setSuccessStatus,
  };
  const [successMessage, setSuccessMessage] = useState("Success");

  //* Task ID for the Edit Pop-up
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectedTaskIdState = {
    selectedTaskId,
    setSelectedTaskId,
  };

  //* Local storage states
  const [tasksArray, setTasksArray] = useLocalStorage("tasks", []);
  const tasksArrayState = {
    tasksArray,
    setTasksArray,
  };

  //* For pop-up rendering
  const popUpList = {
    popUpOptions: {
      ADD: "ADD",
      EDIT: "EDIT",
    },
    togglePopUp: (popUpType) => {
      switch (popUpType) {
        case "ADD":
          setShowAddPopUp(!showAddPopUp);
          break;
        case "EDIT":
          setShowEditPopUp(!showEditPopUp);
          break;

        default:
          break;
      }
    },
    popUpIsClosingState: {
      popUpIsClosing,
      setPopUpIsClosing,
    },
  };

  //* Filter tasks by recent dates
  const filterTasks = () => {
    tasksArray.sort((a, b) => {
      if (a.date === b.date) {
        return a.text.localeCompare(b.text);
      }
      return a.date > b.date ? 1 : -1;
    });
  };
  filterTasks();

  //* Extracts the unique dates from the tasksArray to render
  const uniqueDates = [...new Set(tasksArray.map((task) => task.date))];

  //* Array of tasks to be deleted
  const [selectedTasks, setSelectedTasks] = useState([]);
  const selectedTasksState = {
    selectedTasks,
    setSelectedTasks,
  };

  const deleteSelectedTasks = () => {
    if (selectedTasks.length !== 0) {
      let newTasksArray = tasksArray;
      selectedTasks.forEach((selectedTask) => {
        newTasksArray = newTasksArray.filter((task) => task !== selectedTask);
      });
      setTasksArray(newTasksArray);
      showSuccessMsg("Deleted successfully!");

      //* Restarts to empty array
      setSelectedTasks([]);
      //* Finishes remove action
      closeDeleteOptions();
    } else {
      showErrorMsg("No tasks selected!");
    }
  };

  //* Error handlers
  const showErrorMsg = (message) => {
    setErrorMessage(message);
    setErrorStatus(true);
    setTimeout(() => {
      setErrorStatus(false);
    }, 2500);
  };
  const showSuccessMsg = (message) => {
    setSuccessMessage(message);
    setSuccessStatus(true);
    setTimeout(() => {
      setSuccessStatus(false);
    }, 2500);
  };

  //* Delete options -> closing
  const closeDeleteOptions = () => {
    setDeleteOptionsIsClosing(true);
    setTimeout(() => {
      setRemoveStatus(false);
      setDeleteOptionsIsClosing(false);
    }, 100);
  };

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          currentDate,
          popUpList,
          tasksArrayState,
          selectedTaskIdState,
          removeStatusState,
          errorStatusState,
          successStatusState,
          showErrorMsg,
          showSuccessMsg,
        }}
      >
        <MainUI>
          <MainTitle />

          <TaskManager>
            <Remove closeDeleteOptions={closeDeleteOptions} />
            <AddUI />
            {tasksArray.length === 0 && (
              <img className="arrowup-img" src={arrowUp} alt=""></img>
            )}
          </TaskManager>

          <AllTasks>
            {tasksArray.length === 0 && (
              <>
                <div className="notask-float-container">
                  <p className="notask-float-msg">Let's add a new task!</p>
                </div>
                <div className="notask-msg-container">
                  <p>No tasks found</p>
                </div>
              </>
            )}
            {uniqueDates.map((date) => (
              <React.Fragment key={date}>
                <DateUI id="task-date" taskDate={date} key={date} />
                {tasksArray.map((task) => {
                  if (task.date === date) {
                    return (
                      <Task
                        key={task.id}
                        id={task.id}
                        selectedTasksState={selectedTasksState}
                      ></Task>
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
          </AllTasks>
          {removeStatus && (
            <div
              className={`delete-options-container ${
                deleteOptionsIsClosing ? "close" : ""
              }`}
            >
              <button
                className="delete-options cancel"
                onClick={() => closeDeleteOptions()}
              >
                Cancel
              </button>
              <button
                className="delete-options delete"
                onClick={() => deleteSelectedTasks()}
              >
                Delete
              </button>
            </div>
          )}
          <footer className="footer">Nicolás Valdez @2023</footer>
        </MainUI>
        {showAddPopUp && (
          <>
            <Overlay setShowPopUp={setShowAddPopUp} />
            <PopUp popUpType="add-popup" />
          </>
        )}
        {showEditPopUp && (
          <>
            <Overlay setShowPopUp={setShowEditPopUp} />
            <PopUp popUpType="edit-popup" />
          </>
        )}
        {errorStatus && (
          <Alert className="alert error" key="danger" variant="danger">
            <p className="error-msg">
              Error: <strong>{errorMessage}</strong>
            </p>
          </Alert>
        )}
        {successStatus && (
          <Alert className="alert success" key="success" variant="success">
            {successMessage}
          </Alert>
        )}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;