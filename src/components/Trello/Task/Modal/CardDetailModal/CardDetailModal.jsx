import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {deleteTask, changeTask} from '../../../../../store/store';
import style from './CardDetailModal.module.scss'
import {Comments} from "../../../Comments/Comments";
import {AddComments} from "../../../AddComments/AddComments";
import {PrioritySelector} from "../PrioritySelector/PrioritySelector";
import {CardMembersSelector} from "../CardMembersSelector/CardMembersSelector";

const CardDetailComponent = ({onClose, commentFocused, task, index, columnIndex, deleteTask, changeTask}) => {
    let [isWritable, setIsWritable] = useState(false)
    let [changedTask, setTask] = useState({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            responsible: task.responsible,
            isHidden: task.isHidden,
            comments: task.comments,
            columnId: index
    })

    let [title, setTitle] = useState( task.title);
    const changeTitle = (e) =>{
        setTitle(e.target.value);
    }

    let [priority, setPriority] = useState( task.priority);
    const changePriority = (priority) =>{
        setPriority(priority)
    }

    let [predescription, setPre] = useState('');
    const changePre = (e) =>{
        setPre(e.target.value);
    }

    let [description, setDescription] = useState(task.description);
    const changeDescription = () =>{
        setIsWritable(false);
        setDescription(description =predescription);
    }

    const closeDescription = () => {
        setIsWritable(false);
    }

    let [responsible, setResponsible] = useState(task.responsible);
    const changeResponsible = (responsible) =>{
        setResponsible(responsible)
    }

    let [hidden, setHidden] = useState(task.isHidden);
    const changeHidden = (e) =>{
        setHidden(e.target.checked)
    }

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
   
    const drag = (e) =>{
        e.stopPropagation();
        e.preventDefault();
      }

    const del = () =>{
        deleteTask(columnIndex, index);
    }

    const close = () =>{
        onClose();
    }

    const submit = () =>{
        setTask(changedTask={
            id: task.id,
            title: title,
            description: description,
            priority: priority,
            responsible: responsible,
            isHidden: hidden,
            comments: task.comments,
            columnId: index
        })
        changeTask(columnIndex, index, changedTask)
        onClose();
    }

    // const updateTask = (id) => {
    //     API.getTasks(id)
    //         .then((tasks) => ({todos, currentUserId: id}))
    // }

    return (
        <div draggable = "true" className={style.window} onDragStart ={drag}>
            <div className={style.CardDetailModal}>
                <div className={style.title}>
                    <img src="../../images/edit.png" alt="" className={style.icon}/>
                    <textarea onChange ={changeTitle} value ={title} />
                    <span className={style.close} onClick={close}/>
                </div>
                <div><input checked ={hidden}  onChange ={changeHidden} type="checkbox"/><span>Hide</span></div>
                <PrioritySelector changePriority ={changePriority} task={task}/>
                <div className={style.description}>
                    <img src="../../images/description.png" alt="" className={style.icon}/>
                    <h3>Description</h3>
                </div>

                {!isWritable ? <p className={style.changeDescription} title='add description' 
                onClick={addTextarea} >{description}</p>
                    : <div className={style.textareaChange}>
                        <textarea onChange ={changePre} placeholder='add description...' defaultValue ={description} ref={textInput} />
                        <div className={style.editControls}>
                            <button onClick={changeDescription}>Save</button>
                            <a className={style.close} title='close' onClick={closeDescription}/>
                        </div>
                    </div>
                }
                <CardMembersSelector changeResponsible ={changeResponsible} responsible ={responsible}/>
                <div className={style.detailComments}>
                    <div className={style.description}>
                        <img src="../../images/comments.png" alt="" className={style.icon}/>
                        <h3>Comments</h3>
                    </div>
                    <AddComments focus={commentFocused}/>
                    <Comments/>
                </div>
                <div className={style.dispatch}>
                    <button onClick={submit} className ={style.save}>save</button>
                    <button onClick={del} className ={style.del}>delete</button>
                </div>
            </div>
        </div>
    )
}
 
const mapDispatchToProps = (dispatch) =>({
    deleteTask: (column, index) => dispatch(deleteTask(column, index)),
    changeTask: (column, index, task) => dispatch(changeTask(column, index, task))
})
  
export default connect(null,mapDispatchToProps)(CardDetailComponent);