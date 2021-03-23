import style from './Task.module.scss';
import {connect} from 'react-redux';
import priority from './PriorityMap';
import {draggedTask} from '../../store/store';
import {CardDetailComponent} from "./Modal/CardDetailModal/CardDetailModal";
import {useState} from "react";

const Task = ({task, index, columnIndex, draggedTask}) => {
    const [isShow, setIsShow] = useState(false)
    const [isComment, setIsComment] = useState(false)

    const drag = (e) => {
        e.stopPropagation();
        e.dataTransfer.setData('flag', 'task');
        e.dataTransfer.setData('columnIndex', columnIndex);
        e.dataTransfer.setData('taskIndex', index);
        draggedTask(task);
    }

    const showDetailModal = () => {
        setIsShow(true)
    }

    const onCloseDetailModal = () => {
        setIsShow(false)
    }

    const onClickComment = () => {
        showDetailModal()
        setIsComment(true)
    }

    const responsible = task.responsible ?
        <img width="32px" src="./img/avatar.svg" alt="avatar"/> :
        <img width="26px" src="./img/add.svg" alt="add"/>;

    return (
        <div draggable="true" onDragStart={drag}
             className={style.form}>
            <div className={style.card}>{task.title}</div>
            <span className={style.priority}>{priority[task.priority]}</span>
            <div className={style.items}>
                <span className={style.show} onClick={showDetailModal}>...</span>
                {isShow ? <CardDetailComponent task={task} onClose={onCloseDetailModal} commentFocused={isComment}/> : null}
                <span className={style.comments} onClick={onClickComment}> {task.comments} <img src="./img/comment.svg" alt="comment"/></span>
                <span className={style.responsible}>{responsible}</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    draggedTask: (task) => dispatch(draggedTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);
