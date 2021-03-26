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

    const preventDef = (e) =>{
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div onClick ={preventDef} className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={Close}/>
                {<h3>Delete board?</h3>}
                <div className={style.title}>
                    <button className={style.yes} onClick ={Del}>Yes</button>
                    <button className={style.no} onClick ={Close}>No</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteModal;
