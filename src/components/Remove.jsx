import React, { useContext } from 'react';
import RemoveIcon from '../assets/icons/remove.svg';
import '../css/TaskIcons.css';
import { GlobalContext } from '../App';

function Remove({ closeDeleteOptions }){
    const { removeStatusState } = useContext(GlobalContext);
    const { removeStatus, setRemoveStatus } = removeStatusState;

    return(
        <img 
            className='remove-btn'
            src={ RemoveIcon } 
            alt='Delete icon'
            onClick={()=> {
                removeStatus ? closeDeleteOptions() : setRemoveStatus(true);
            }}
        >
        </img>
    );
}
export default Remove;