import React, { createContext, useState } from "react";
import "./App.css";
import "./css/scrollbar.css";
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
  
  //* Task states
  const [popUpTaskText, setPopUpTaskText]= useState('');
  const [popUpDate, setPopUpDate]= useState(currentDate);
  const [taskId,setTaskId] = useState(null);
  const popUpTaskTextState = {
    popUpTaskText,
    setPopUpTaskText
  }
  const popUpDateState = {
    popUpDate,
    setPopUpDate
  }
  const taskIdState = {
    taskId,
    setTaskId
  }

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

  return (
    <div className="App">
      <GlobalContext.Provider 
        value={ {currentDate, popUpList, tasksArrayState, popUpTaskTextState, popUpDateState, taskIdState} }>
        <MainUI>
          <MainTitle />

          <TaskManager>
            <Remove />
            <AddUI />
          </TaskManager>

          <AllTasks>
            {tasksArray.map(()=>(
              <Task key={taskId} id={taskId} text={popUpTaskText} date={popUpDate} ></Task>
            ))}
          </AllTasks>
        </MainUI>
        {
          showAddPopUp && (
            <>
              <Overlay />
              <PopUp popUpType="add-popup" />
            </>
          )
        }
        {
          showEditPopUp && (
            <>
              <Overlay />
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
newTasksArray.sort((a,b)=> (a.date > b.date ? 1 : -1));*/
