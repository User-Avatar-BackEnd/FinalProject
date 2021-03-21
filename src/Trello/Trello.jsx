import React from 'react';
import {connect} from 'react-redux';

import style from './Trello.module.scss';
import Column from './Column/Column';
import Add from './Add/Add';
import {addColumn} from './store/store'

const Trello = ({title, columns, addColumn}) =>{
  
   const orderedColumns = columns.sort((a, b) => a.order - b.order);

    return (
      <React.Fragment>
        <h1 className ={style.boardTitle}>{title}</h1>
        <div className ={style.board}>
          {orderedColumns.map((item,i)=><Column key ={item.id} index ={i} />)}
          <Add add ={addColumn}/>
          <div style={{minWidth:"40px",visibility: "hidden"}} >.</div>
        </div>
      </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
  title: state.title,
  columns: state.columns
});

const mapDispatchToProps = (dispatch) =>({
  addColumn: (col) => dispatch(addColumn(col))
})

export default connect(mapStateToProps,mapDispatchToProps)(Trello);
