import React, {useEffect, useRef, useState} from "react";
import style from './AddComments.module.scss'

export const AddComments = ({focus}) => {

    const textarea = useRef(null)

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        console.log("focus", focus)
        focus && textarea.current.focus()
    })

    return (
        <div className={style.AddComments}>
            <img src="" alt=""/>
            <form action="">
                <div className={style.newComment}>
                    <textarea placeholder='add comment...' value={text} ref={textarea} onChange={handleChange}/>
                    <button  className={text.trim() === '' ? style.save : null}>Save</button>
                </div>
            </form>
        </div>
    )
}
