import React from "react";
import style from './BoardModal.module.scss'

export const BoardModal = ({close}) => {
    return (
        <div className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={close}/>
                <h3>Add new board</h3>
                <div className={style.title}>
                    <input type="text"/>
                    <button className={style.save}>save</button>
                </div>

            </div>
        </div>
    )
}
