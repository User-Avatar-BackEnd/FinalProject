import style from './Task.module.scss';
import {connect} from 'react-redux';
import priority from './PriorityMap';
import {draggedTask} from '../../store/store';

const Task = ({task, index, columnIndex, draggedTask}) =>{
    const drag = (e) =>{
        e.stopPropagation();
        e.dataTransfer.setData('flag', 'task');
        e.dataTransfer.setData('columnIndex', columnIndex);
        e.dataTransfer.setData('taskIndex', index);
        draggedTask(task);
      }

    const responsible = task.responsible ? 
                        <img width ="32px"  src="./img/avatar.svg" alt="avatar"/> :
                        <img width ="26px" src="./img/add.svg" alt="add"/>;

    return (
        <div draggable = "true" onDragStart ={drag}
         className ={style.form}>
            <div className ={style.card}>{task.title}</div>
            <span className={style.priority}>{priority[task.priority]}</span>
            <div className ={style.items}>
                <span className={style.show}>...</span>
                <span className={style.comments}> {task.comments} <img src="./img/comment.svg" alt="comment"/></span>
                <span className={style.responsible}>{responsible}</span>
            </div>
        </div> 
    )
}

const mapStateToProps = (state) => ({
    
});
  
const mapDispatchToProps = (dispatch) =>({
    draggedTask: (task) => dispatch(draggedTask(task))
})
  
  export default connect(mapStateToProps,mapDispatchToProps)(Task);