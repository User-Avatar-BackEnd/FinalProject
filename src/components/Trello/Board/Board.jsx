import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './Board.module.scss';
import Column from '../Column/Column';
import Add from '../Add/Add';
import {addColumn, getBoard} from '../../../ducks/duckTrello';

const Board = ({title, columns}) =>{
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(()=>dispatch(getBoard(id)),[]);

  const addNewColumn = (title) =>{
    if(title.trim().length){
      dispatch(addColumn(title, id))
    }
  }
  
  if(columns){
    const orderedColumns = columns.sort((a, b) => a.order - b.order);
    return (
      <React.Fragment>
        <h1 className ={style.boardTitle}>{title}</h1>
        <div className ={style.board}>
          {orderedColumns.map((item,i)=><Column key ={item.id} boardId ={id} index ={i} />)}
          <Add add ={addNewColumn}/>
          <div style={{minWidth:"40px",visibility: "hidden"}} >.</div>
        </div>
      </React.Fragment>
    );
  } else{
    return <div>Load...</div>
  }
   
}

const mapStateToProps = (state) => ({
  title: state.trello.title,
  columns: state.trello.columns
});

export default connect(mapStateToProps)(Board);
