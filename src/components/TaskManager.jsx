import React from 'react';
import MenuIcon from '../assets/icons/menu.svg';

const TaskManager = ( { children }) => {
  return (
    <div className="taskmanager-container">
      <img src={MenuIcon} alt="Menu"></img>
      <div>
        { children }
      </div>
    </div>
  )
}

export { TaskManager }