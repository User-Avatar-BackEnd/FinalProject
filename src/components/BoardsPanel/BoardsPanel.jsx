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
            <h1>My Boards</h1>
            <div className={style.wrapper}>
                {boards.map((item, i) => <Link key ={item.id} to ={`/board/${item.id}`}>
                    <Board index ={i} id ={item.id} title ={item.title} />
                    </Link>)}
                <AddBoard/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    boards: state.panel.boards
});
  
export default connect(mapStateToProps)(BoardsPanel);
