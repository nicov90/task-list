import React, { createContext, useState } from "react";
import "./App.css";
import "./css/scrollbar.css";
import arrowUp from './assets/arrowup.png';
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

  //* Local storage states
  const [tasksArray, setTasksArray] = useLocalStorage('tasks',[]);
  const tasksArrayState = {
    tasksArray,
    setTasksArray
  }

  const popUpList = {
    popUpOptions: {
      ADD : 'ADD',
      EDIT : 'EDIT'
    },
    togglePopUp: (popUpType) =>{
      switch (popUpType) {
        case 'ADD': setShowAddPopUp(!showAddPopUp)
          break;
        case 'EDIT': setShowEditPopUp(!showEditPopUp)
          break;
    
        default:
          break;
      }
    },
    popUpIsClosingState: {
      popUpIsClosing,
      setPopUpIsClosing
    }
  }
  const filterTasks = () =>{
    tasksArray.sort((a,b)=> (a.date > b.date ? 1 : -1));
  }
  filterTasks();

  return (
    <div className="App">
      <GlobalContext.Provider 
        value={ {currentDate, popUpList, tasksArrayState} }>
        <MainUI>
          <MainTitle />

          <TaskManager>
            <Remove />
            <AddUI />
            {tasksArray.length == 0 && (
              <img className="arrowup-img" src={arrowUp}></img>
            )}
          </TaskManager>

          <AllTasks>
            {tasksArray.length == 0 && (
              <div className="no-task-msg-container">
                <p className="no-task-msg">Let's add a new task!</p>
              </div>
            )}
            {tasksArray.map((task)=>(
              <Task key={task.id} id={task.id} ></Task>
            ))}
          </AllTasks>
        </MainUI>
        {
          showAddPopUp && (
            <>
              <Overlay setShowPopUp={setShowAddPopUp} />
              <PopUp popUpType="add-popup" />
            </>
          )
        }
        {
          showEditPopUp && (
            <>
              <Overlay setShowPopUp={setShowEditPopUp}/>
              <PopUp popUpType="edit-popup" />
            </>
          )
        }
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

/* Filtra por fechas mas recientes
tasksArray.sort((a,b)=> (a.date > b.date ? 1 : -1));*/
