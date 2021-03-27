import React, {useState} from "react"
import style from "./Comments.module.scss";

const Comment = ({editable, comment, onSave, onClose}) => {

    const [text, setText] = useState('')

    return <div className={style.wrapper}>
        {editable ?
            <div className={style.comment}>
                <span className={style.close} onClick={onClose}/>
                <textarea defaultValue={comment.text} onChange={(e) => setText(e.target.value)}/>
                <button className={style.save} onClick={() => onSave(comment.id, text)}>save</button>
            </div> :
            <p>{comment.text}</p>
        }
    </div>
}

export default Comment
