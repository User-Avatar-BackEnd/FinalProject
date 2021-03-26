import React,{useState, useEffect, useRef} from "react";
import {useDispatch} from 'react-redux';
import style from './DeleteModal.module.scss';

const DeleteModal = ({close, del}) => {
    
    const Del = () =>{
        del();
    }

    const Close = () =>{
        close();
    }

    const preventDrag = (e) =>{
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div draggable = "true" onDragStart ={preventDrag} className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={Close}/>
                {<h3>Delete column?</h3>}
                <div className={style.title}>
                    <button className={style.yes} onClick ={Del}>Yes</button>
                    <button className={style.no} onClick ={Close}>No</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteModal;
