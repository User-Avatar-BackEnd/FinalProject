import {useState, useRef, useEffect} from 'react';
import style from './Column.module.scss';
import Card from '../Task/Card';
import {connect, useDispatch} from 'react-redux';
import {addTask, setdeleteCard, dropCard, changeColumnOrder, deleteColumn, changeTitleColumn} from '../../../store/ducks/duckTrello';
import Add from '../Add/Add';
import DelModal from './DeleteModal/DeleteModal';

 const Column = ({index, boardId, columns, dropedTask, setdeleteCard, showHidden}) => {
    const dispatch = useDispatch();

    const title = columns[index].title;
    const cards = columns[index].cards;
    const id = columns[index].id;
    const order = index;

    let [text, setText] = useState(title);
    let [visible, setVisible] = useState(true);
    let [focus, setFocus] = useState(true);

    useEffect(()=>textInput.current.focus(),[visible])

    const textInput = useRef(null);

    const [isShow, setIsShow] = useState(false);

    const showDeleteModal = () => {
      setIsShow(true);
      setFocus(focus= true);
    }
    const closeDeleteModal = () => {
        setIsShow(false)
        textInput.current.focus()
    }
   
    const adding = (title) =>{
      if(title.trim().length){
        dispatch(addTask(boardId, id, title, index));
      }
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
        dispatch(changeTitleColumn(boardId,index,id,text));
        setVisible(visible = true);
      }
    }

    const del = () =>{
      dispatch(deleteColumn(boardId,index,id));
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
        const dropedOrder = +e.dataTransfer.getData('orderDraged');
        dispatch(changeColumnOrder(boardId, id, index,  dropedOrder));
        dispatch(changeColumnOrder(boardId, columns[dropedIndex].id, dropedIndex,  order));
      } else {
        const columnIndex = e.dataTransfer.getData('columnIndex');
        const taskIndex = e.dataTransfer.getData('taskIndex');

        setdeleteCard(columnIndex, taskIndex);
        dispatch(dropCard(boardId, dropedTask.id, id, index, dropedTask)); 
      }
    }

    const drag = (e) =>{
      e.dataTransfer.setData('indexDraged', index );
      e.dataTransfer.setData('orderDraged', order );
      e.dataTransfer.setData('flag', 'column');
    }

    return (
      <div className ={style.block} 
      draggable = "true" onDragOver ={(e) => e.preventDefault()}
      onDrop ={drop} onDragStart ={drag}>

        <div style ={{display: visible ? "none" : "block"}} className ={style.columnHead}>
          <input ref = {textInput} onChange ={getValue} onKeyDown ={edit} onBlur ={stopEdit}
           className ={style.edit} type ="text" value ={text} />

          <div onMouseOver ={over} onMouseOut ={out} onClick ={showDeleteModal} className ={style.del}>
            <img height ='32px' src ='../../images/del.svg' alt ='del' />
          </div>
        </div>

        {isShow ? <DelModal del ={del} close={closeDeleteModal} /> : null}

        <div style={{display: visible ? "block" : "none"}} className ={style.columnHead}>
          <div className ={style.title}>{title}</div> 
          <div onClick ={startEdit} className ={style.more}>...</div>
        </div>

        <Add column ={true} add ={adding}/>
        <div className ={style.cards} >
          {cards ? cards.sort((a, b) => a.priority - b.priority).map((item,i)=>{
            {if(!item.isHidden || showHidden){
              return <Card
              key ={item.id}
              boardId ={boardId}
              index ={i}
              columnId ={id}
              columnIndex ={index}
              card ={item} />
            }}
          }): true}
        </div>

      </div>
    )
}

const mapStateToProps = (state) => ({
  columns: state.trello.columns,
  dropedTask: state.trello.dropedTask,
  showHidden: state.trello.showHidden
});

const mapDispatchToProps = (dispatch) =>({
  setdeleteCard: (column,index) => dispatch(setdeleteCard(column,index))
})

export default connect(mapStateToProps,mapDispatchToProps)(Column);