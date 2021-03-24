import {connect} from 'react-redux';
import {useState} from "react";
import style from './Task.module.scss';
import priority from './PriorityMap';
import {draggedTask} from '../../../store/store';
import CardDetailComponent from "./Modal/CardDetailModal/CardDetailModal";

const Task = ({task, index, columnIndex, draggedTask}) =>{
    const [isShow, setIsShow] = useState(false)

    const drag = (e) =>{
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

    const responsible = task.responsible ? 
                        <img width ="32px"  src="../../images/avatar.svg" alt="avatar"/> :
                        <img width ="26px" src="../../images/add.svg" alt="add"/>;

    return (
        <div draggable = "true" onDragStart ={drag}
         className ={style.form}>
            <div className ={style.card}>{task.title}</div>
            <span className={style.priority} onClick={showDetailModal}>{priority[task.priority]}</span>
            <div className ={style.items}>
            {isShow ? <CardDetailComponent task={task} index ={index} columnIndex ={columnIndex} onClose={onCloseDetailModal} /> : null}
                <span className={style.show} onClick={showDetailModal}>...</span>
                <span className={style.comments} onClick={showDetailModal}> {task.comments} <img src="../../images/comment.svg" alt="comment"/></span>
                <span className={style.responsible} onClick={showDetailModal}>{responsible}</span>
            </div>
        </div> 
    )
}

const mapDispatchToProps = (dispatch) =>({
    draggedTask: (task) => dispatch(draggedTask(task))
})
  
  export default connect(null,mapDispatchToProps)(Task);