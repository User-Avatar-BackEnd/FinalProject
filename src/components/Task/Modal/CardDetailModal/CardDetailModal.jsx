import React, {useEffect, useRef, useState} from "react";
import style from './CardDetailModal.module.scss'
import {Comments} from "../../../Comments/Comments";
import {AddComments} from "../../../AddComments/AddComments";
import {PrioritySelector} from "../PrioritySelector/PrioritySelector";
import {CardMembersSelector} from "../CardMembersSelector/CardMembersSelector";

export const CardDetailComponent = ({onClose, commentFocused, task}) => {
    const [isWritable, setIsWritable] = useState(false)
    const textInput = useRef(null)


    const addTextarea = () => {
        setIsWritable(true)
    }

    useEffect(() => {
        isWritable && handleFocus()
    })

    const handleFocus = () => {
        textInput.current.focus()
    }
    const closeDescription = () => {
        setIsWritable(false)
    }

    // const updateTask = (id) => {
    //     API.getTasks(id)
    //         .then((tasks) => ({todos, currentUserId: id}))
    // }

    return (
        <div className={style.window}>
            <div className={style.CardDetailModal}>
                <div className={style.title}>
                    <img src="./images/edit.png" alt="" className={style.icon}/>
                    <textarea>First Task</textarea>
                    <a href="" title='close' className={style.close} onClick={onClose}/>
                </div>
                {/*onPrioritySelected={updateTask}*/}
                <PrioritySelector task={task}/>
                <div className={style.description}>
                    <img src="./images/description.png" alt="" className={style.icon}/>
                    <h3>Description</h3>
                </div>

                {!isWritable ? <p className={style.changeDescription} title='add description' onClick={addTextarea}>add
                        description...</p>
                    : <div className={style.textareaChange}>
                        <textarea placeholder='add description...' ref={textInput} onFocus={handleFocus}/>
                        <div className={style.editControls}>
                            <button>Save</button>
                            <a className={style.close} title='close' onClick={closeDescription}/>
                        </div>
                    </div>
                }
                <CardMembersSelector/>
                <div className={style.detailComments}>
                    <div className={style.description}>
                        <img src="./images/comments.png" alt="" className={style.icon}/>
                        <h3>Comments</h3>
                    </div>
                    <AddComments focus={commentFocused}/>
                    <Comments/>
                </div>
                <div className={style.saveAll}>
                    <button>save</button>
                    <button>delete</button>
                </div>
            </div>
        </div>
    )
}
