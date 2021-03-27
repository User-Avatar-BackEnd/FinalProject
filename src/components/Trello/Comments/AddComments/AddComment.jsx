import React, {useRef, useState} from "react";
import style from './AddComments.module.scss'
import {useDispatch} from "react-redux";
import {addComment} from "../../../../store/ducks/duckComments";

export const AddComment = ({focus, boardId, cardId}) => {

    const textarea = useRef(null)

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => setText(e.target.value)

    const sendComment = () => {
        if (text.trim() !== '')
        dispatch(addComment(cardId, boardId, text))
        setText('')
    }

    return (
        <div className={style.AddComments}>
            <img src="" alt=""/>
                <div className={style.newComment}>
                    <textarea placeholder='add comment...' value={text} ref={textarea} onChange={handleChange}/>
                    <button onClick={sendComment} className={text.trim() === '' ? style.save : null}>Save</button>
                </div>
        </div>
    )
}

