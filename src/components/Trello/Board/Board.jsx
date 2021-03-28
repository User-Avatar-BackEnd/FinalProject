import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import style from './Board.module.scss';
import Column from '../Column/Column';
import Add from '../Add/Add';
import {addColumn, getBoard, setShowHidden} from '../../../store/ducks/duckTrello';
import AddMembers from './AddMembers/AddMembers';

const Board = ({title, columns, showHidden}) =>{
  const dispatch = useDispatch();

  const {id} = useParams();
  const history = useHistory()

  useEffect(()=>dispatch(getBoard(id)),[]);

  const addNewColumn = (title) =>{
    if(title.trim().length){
      dispatch(addColumn(title, id))
    }
  }

  const back = () =>{
    history.goBack();
  }

  const changeHidden = (e) =>{
    showHidden(e.target.checked)
}
  
  if(columns){
    const orderedColumns = columns.sort((a, b) => a.order - b.order);
    return (
      <div>
        <div className ={style.fixed}>
          <div className ={style.wrap}>
            <div>
              <h1 className ={style.boardTitle}>{title}</h1>
              <span onClick ={back} className ={style.back}>&#60; Back</span>
              <div className ={style.show}>Show hidden? <input onChange ={changeHidden} type="checkbox"/></div>
            </div>
            <AddMembers />
          </div>
        </div>
        
        <div className ={style.board}>
          {orderedColumns.map((item,i)=><Column key ={item.id} boardId ={id} index ={i} />)}
          <Add add ={addNewColumn}/>
          <div style={{minWidth:"40px",visibility: "hidden"}} >.</div>
        </div>
      </div>
    );
  } else{
    return <div>Load...</div>
  }
   
}

const mapStateToProps = (state) => ({
  title: state.trello.title,
  columns: state.trello.columns
});

const mapDispatchToProps = (dispatch) =>({
  showHidden: (bool) => dispatch(setShowHidden(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);