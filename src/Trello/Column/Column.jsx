import style from './Column.module.scss';
import Card from '../Task/Task';
import {connect} from 'react-redux';
import {addTask, changeColumnOrder, deleteTask, dropTask} from '../store/store'
import Add from '../Add/Add'

 const Column = ({index, columns, addTask, deleteTask, order, dropedTask, dropTask}) => {
   
    const title = columns[index].title;
    const tasks = columns[index].tasks;

    const Adding = (title) =>{
      addTask(title, index);
    }

    const drop = (e) =>{
      if(e.dataTransfer.getData('flag') === 'column'){
        const dropedIndex = +e.dataTransfer.getData('indexDraged');
        order(index,dropedIndex);
        order(dropedIndex,index);
      } else {
        const columnIndex = e.dataTransfer.getData('columnIndex');
        const taskIndex = e.dataTransfer.getData('taskIndex');
        deleteTask(columnIndex, taskIndex);
        dropTask(dropedTask, index);
      }
    }

    const drag = (e) =>{
      e.dataTransfer.setData('indexDraged', index );
      e.dataTransfer.setData('flag', 'column');
    }

    return (
      <div className ={style.block} 
      draggable = "true" onDragOver ={(e) => e.preventDefault()}
      onDrop ={drop} onDragStart ={drag}>
        <div className ={style.columnHead}>
          <div className ={style.title}>{title}</div> <div className ={style.more}>...</div>
        </div>
        <Add column ={true} add ={Adding}/>
        <div className ={style.cards} >
          {tasks ? tasks.map((item,i)=>{
            return <Card
              key ={item.id}
              index ={i}
              columnIndex ={index}
              task ={item} />
          }): true}
        </div>

      </div>
    )
    
}

const mapStateToProps = (state) => ({
  columns: state.columns,
  dropedTask: state.dropedTask
});

const mapDispatchToProps = (dispatch) =>({
  addTask: (task, index) => dispatch(addTask(task, index)),
  order : (index, order) => dispatch(changeColumnOrder(index, order)),
  deleteTask: (column, index) => dispatch(deleteTask(column, index)),
  dropTask: (task,index) => dispatch(dropTask(task,index))
})

export default connect(mapStateToProps,mapDispatchToProps)(Column);