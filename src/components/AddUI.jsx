import React from 'react';
import AddIcon from '../assets/icons/add.svg';
import '../css/TaskIcons.css';
import { useContext } from 'react';
import { GlobalContext } from '../App';

function Add(){
    const { popUpList } = useContext(GlobalContext);
    const { popUpOptions, togglePopUp} = popUpList;

    return(
        <img 
            className='add-btn'
            src={ AddIcon } 
            alt='Add icon'
            onClick={() => togglePopUp(popUpOptions.ADD)}
        >
        </img>
    );
}
export default Add;

/*const openPopUp = () =>{
    const overlay = document.querySelector(".overlay");
    const addPopUp = document.getElementById("add-popup");
    const popUp = document.querySelector(".popup");

    const currentCenterPos = (window.scrollY + window.innerHeight / 2) /
    document.documentElement.scrollHeight * document.documentElement.scrollHeight;

    //* Centrar popUp en pantalla
    popUp.style.top = `${currentCenterPos}px`;
    //* Visibiliza la capa oscura y setea el ancho sin contar el scrollbar
    overlay.style.visibility = 'visible';
    overlay.style.width = `${document.body.clientWidth}px`;
    //* Muestra la ventana de Add
    addPopUp.style.display = 'flex';
}*/