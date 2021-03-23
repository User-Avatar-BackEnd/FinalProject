import style from './Task.module.scss';
import {connect} from 'react-redux';
import priority from './PriorityMap';
import {dragedTask} from '../store/store'
import React, {useState} from "react";
import {CardDetailComponent} from "../../components/Task/Modal/CardDetailModal/CardDetailModal";

const Task = ({task, index, columnIndex, dragedTask}) => {
    const [isShowed, setShowed] = useState(false)

    const drag = (e) => {
        e.stopPropagation();
        e.dataTransfer.setData('flag', 'task');
        e.dataTransfer.setData('columnIndex', columnIndex);
        e.dataTransfer.setData('taskIndex', index);
        dragedTask(task);
    }

    const responsible = task.responsible ?
                        <img width ="32px"  src="./img/avatar.svg" alt="avatar"/> :
                        <img width ="26px" src="./img/add.svg" alt="add"/>;

    const showDetailModal = () => {
        setShowed(true)
    }

    const onCloseDetailModal = () => {
        setShowed(false)
    }

    return (
        <div draggable="true" onDragStart={drag} className={style.form}>
            {isShowed && <CardDetailComponent task={task} onClose={onCloseDetailModal}/>}
            <div className={style.card}>{task.title}</div>
            <span className={style.priority}>{priority[task.priority]}</span>
            <div className={style.items}>
                <span className={style.show} onClick={showDetailModal}>...</span>
                <span className={style.comments}> {task.comments} <img src="./img/comment.svg" alt="comment"/></span>
                <span className={style.responsible}>{responsible}</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    dragedTask: (task) => dispatch(dragedTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);
