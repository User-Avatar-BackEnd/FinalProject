import React,{useEffect} from "react";
import { Link } from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import style from './BoardsPanel.module.scss'
import {AddBoard} from "./AddBoard/AddBoard";
import {Board} from "./Board/Board";
import {getBoards} from '../../store/ducks/duckBoardsPanel';

const BoardsPanel = ({boards}) => {
    const dispatch = useDispatch();
    useEffect(() =>dispatch(getBoards()),[])
    return (
        <div className={style.BoardsPanel}>
            <h2>My Boards</h2>
            <div className={style.wrapper}>
                {boards.map((item, i) => {
                    if( item.isOwner){
                        return <Link key ={item.id} to ={`/board/${item.id}`}>
                        <Board editable ={item.isOwner} index ={i} id ={item.id} title ={item.title} />
                        </Link>
                    }
                })}
                { boards.filter((item)=>item.isOwner).length < 10 && <AddBoard/>}
            </div>
            <h2>Boards from Invites</h2>
            <div className={style.wrapper}>
                {boards.map((item, i) => {
                    if( !item.isOwner){
                        return <Link key ={item.id} to ={`/board/${item.id}`}>
                        <Board editable ={item.isOwner} index ={i} id ={item.id} title ={item.title} />
                        </Link>
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    boards: state.panel.boards
});
  
export default connect(mapStateToProps)(BoardsPanel);