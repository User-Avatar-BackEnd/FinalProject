import React from "react";
import style from './DeleteModal.module.scss';

const DeleteModal = ({close, del, id, login}) => {
    
    const Del = () =>{
        del(id);
        close();
    }

    const Close = () =>{
        close();
    }

    return (
        <div className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={Close}/>
                {<h3>Delete {login} from members?</h3>}
                <div className={style.title}>
                    <button className={style.yes} onClick ={Del}>Yes</button>
                    <button className={style.no} onClick ={Close}>No</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteModal;
