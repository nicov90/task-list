import React, { useContext } from 'react'
import { GlobalContext } from '../App'

const AllTasks = ({ children }) => {
  const { removeStatusState } = useContext(GlobalContext);
  const { removeStatus } = removeStatusState;

  return (
    <div className={`all-tasks ${removeStatus ? 'removeStatusIsActive' : ''}`}>
      { children }
    </div>
  )
}

export default AllTasks