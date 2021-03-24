import {useState, useRef, useEffect} from 'react';
import style from './Column.module.scss';
import Task from '../Task/Task';
import {connect} from 'react-redux';
import {addTask, deleteTask, dropTask, changeColumnOrder, deleteColumn, changeTitleColumn} from '../../../store/store';
import Add from '../Add/Add';

 const Column = ({index, columns, addTask, deleteTask, order, dropedTask, dropTask, deleteColumn, changeTitleColumn}) => {

    const title = columns[index].title;
    const tasks = columns[index].tasks;

    let [text, setText] = useState(title);
    let [visible, setVisible] = useState(true);
    let [focus, setFocus] = useState(true);

    useEffect(()=>textInput.current.focus(),[visible])

    const textInput = useRef(null);
   
    const adding = (title) =>{
      addTask(title, index);
    }

    const startEdit = () =>{
      setVisible(visible = false);
    }

    const stopEdit = () =>{
     if(focus){
      setText(text = title);
      setVisible(visible = true);
     }
    }

    const getValue = (e) =>{
      setText(text = e.target.value);
    }

    const edit = (e) =>{
      if (e.keyCode === 13) {
        changeTitleColumn(text, index);
        setVisible(visible = true);
      }
    }

    const del = () =>{
      deleteColumn(index);
    }

    const over = () =>{
      setFocus(focus= false);
    }

    const out = () =>{
      setFocus(focus= true);
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

        <div style ={{display: visible ? "none" : "block"}} className ={style.columnHead}>

          <input ref = {textInput} onChange ={getValue} onKeyDown ={edit} onBlur ={stopEdit}
           className ={style.edit} type ="text" value ={text} />

          <div onMouseOver ={over} onMouseOut ={out} onClick ={del} className ={style.del}>
            <img height ='32px' src ='../../images/del.svg' alt ='del'></img>
          </div>

        </div>

        <div style={{display: visible ? "block" : "none"}} className ={style.columnHead}>
          <div className ={style.title}>{title}</div> 
          <div onClick ={startEdit} className ={style.more}>...</div>
        </div>

        <Add column ={true} add ={adding}/>
        <div className ={style.cards} >
          {tasks ? tasks.map((item,i)=>{
            return <Task
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
  dropTask: (task,index) => dispatch(dropTask(task,index)),
  deleteColumn: (index) => dispatch(deleteColumn(index)),
  changeTitleColumn: (title, index) => dispatch(changeTitleColumn(title, index))
})

export default connect(mapStateToProps,mapDispatchToProps)(Column);