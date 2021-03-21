import style from './Task.module.scss';
import {connect} from 'react-redux';
import priority from './PriorityMap';
import {dragedTask} from '../store/store'

const Task = ({task, index, columnIndex, dragedTask}) =>{
    const drag = (e) =>{
        e.stopPropagation();
        e.dataTransfer.setData('flag', 'task');
        e.dataTransfer.setData('columnIndex', columnIndex);
        e.dataTransfer.setData('taskIndex', index);
        dragedTask(task);
      }

    return (
        <div draggable = "true" onDragStart ={drag}
         className ={style.form}>
            <div className ={style.card}>{task.title}</div>
            <div className ={style.items}>
                <span className={style.show}>...</span>
                <span className={style.priority}>{priority[task.priority]}</span>
            </div>
        </div> 
    )
}

const mapStateToProps = (state) => ({
    
});
  
const mapDispatchToProps = (dispatch) =>({
    dragedTask: (task) => dispatch(dragedTask(task))
})
  
  export default connect(mapStateToProps,mapDispatchToProps)(Task);