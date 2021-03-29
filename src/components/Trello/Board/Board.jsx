import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import style from './Board.module.scss';
import Column from '../Column/Column';
import Add from '../Add/Add';
import {addColumn, getBoard, setShowHidden} from '../../../store/ducks/duckTrello';
import AddMembers from './AddMembers/AddMembers';
import API from '../../../config/API';

const Board = ({title, columns, showHidden}) =>{
  const dispatch = useDispatch();

  const {id} = useParams();
  const history = useHistory()

  const [show, setShow] = useState(true);
  const [margin, setMargin] = useState(0);

  useEffect(() => dispatch(getBoard(id)), []);

  useEffect(() => {
    let isCancelled = false

    async function subscribe(ticks) {
      API({
        method: 'get',
        url:`/boards/${id}/changes/?ticks=${ticks}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
      })
        .then(async response => {
          if (!isCancelled) {
            if (response.status === 502) {

              await subscribe();
            } else if (response.status !== 200) {
              console.log('error')

              await new Promise(resolve => setTimeout(resolve, 10000));
              await subscribe(null);
            } else {
              if(response.data.changed) {
                dispatch(getBoard(id))
              }

              await new Promise(resolve => setTimeout(resolve, 10000));
              await subscribe(response.data.ticks);
            }
          }
        })
    }

    subscribe(null);

    return () => isCancelled = true;
  }, [])

    const addNewColumn = (title) => {
        if (title.trim().length) {
            dispatch(addColumn(title, id))
        }
    }

    const back = () => {
    history.goBack();
  }

  const changeHidden = () =>{
    setShow(!show)
    showHidden(show)
  }
  window.addEventListener('scroll', () => {
    setMargin(window.scrollX);
  });
  
  if(columns){
   
    return (
      <div>
        <div style ={{marginLeft: `${margin}px`}} className ={style.fixed}>
          <div className ={style.wrap}>
            <div>
              <div className={style.item}>
                <span onClick ={back} className ={style.back}>&#60;</span>
                <h1 className ={style.boardTitle}>{title}</h1>
              </div>
              <div className ={style.show}>Show hidden? <span onClick ={changeHidden} className = {classNames(style.switchBtn,{[style.switchOn]: !show})}></span></div>
            </div>
            <AddMembers />
          </div>
        </div>
        
        <div className ={style.board}>
          {columns.map((item,i)=><Column key ={item.id} boardId ={id} index ={i} />)}
          { columns.length < 20 && <Add add ={addNewColumn}/>}
          <div style={{minWidth:"40px",visibility: "hidden"}} >.</div>
        </div>
      </div>
    );
  } else{
    return <div>Load...</div>
  }
   
}

const mapStateToProps = (state) => ({
    title: state.trello.board.title,
    columns: state.trello.board.columns
});

const mapDispatchToProps = (dispatch) =>({
  showHidden: (bool) => dispatch(setShowHidden(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);
