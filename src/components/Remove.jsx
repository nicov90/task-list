import React from 'react';
import RemoveIcon from '../assets/icons/remove.svg';
import '../css/TaskIcons.css';

function Remove(){
    return(
        <img 
            className='remove-btn'
            src={ RemoveIcon } 
            alt='Delete icon'
            onClick={()=> alert("Función en construcción.")}
        >
        </img>
    );
}
export default Remove;