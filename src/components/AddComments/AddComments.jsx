import React, {useState} from "react";
import style from './AddComments.module.scss'

export const AddComments = () => {

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={style.AddComments}>
            <img src="" alt=""/>
            <form action="">
                <div className={style.newComment}>
                    <textarea placeholder='add comment...' value={text} onChange={handleChange}/>
                    <button  className={text.trim() === '' ? style.save : null}>Save</button>
                </div>
            </form>
        </div>
    )
}
