import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addComment} from "../../../../store/ducks/duckComments";
import style from './AddComments.module.scss';

export const AddComment = ({boardId, cardId}) => {

    const textarea = useRef(null)

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => setText(e.target.value)

    const sendComment = () => {
        if (text.trim() !== '' && text.length <= 256)
        dispatch(addComment(cardId, boardId, text))
        setText('')

    }

    return (
        <div className={style.AddComments}>
            <img src="" alt=""/>
                <div className={style.newComment}>
                    <textarea maxLength={256} placeholder='add comment...' value={text} ref={textarea} onChange={handleChange}/>
                    <button onClick={sendComment} className={text.trim() === '' ? style.save : null}>Save</button>
                </div>
        </div>
    )
}

