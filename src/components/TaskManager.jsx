import React, { useContext } from 'react';
import MenuIcon from '../assets/icons/menu.svg';
import SearchBar from './SearchBar';
import { GlobalContext } from '../App';

const TaskManager = ( { children }) => {
  const { tasksArrayState } = useContext(GlobalContext);
  const { tasksArray } = tasksArrayState;

  return (
    <div className="taskmanager-container">
      <div className='leftmenu-container'>
        <img src={MenuIcon} alt="Menu" onContextMenu={event => event.preventDefault()}></img>
        {tasksArray.length !== 0 && (
          <SearchBar />
        )}
      </div>
      <div>
        { children }
      </div>
    </div>
  )
}

export { TaskManager }