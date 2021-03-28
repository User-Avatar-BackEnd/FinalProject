import {connect, useDispatch} from 'react-redux';
import {useState} from "react";
import style from './Card.module.scss';
import priority from './PriorityMap';
import {draggedCard} from '../../../store/ducks/duckTrello';
import CardDetailComponent from "./Modal/CardDetailModal/CardDetailModal";
import {CommentsModal} from "../Comments/CommentsModal/CommentsModal";
import {clearComments} from "../../../store/ducks/duckComments";
import UserIcon from '../../UserIcon/UserIcon';

const Card = ({card, boardId, index, columnIndex, columnId, draggedCard, members}) =>{
    const [isShow, setIsShow] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const dispatch = useDispatch()

    const drag = (e) =>{
        e.stopPropagation();
        e.dataTransfer.setData('flag', 'task');
        e.dataTransfer.setData('columnIndex', columnIndex);
        e.dataTransfer.setData('taskIndex', index);
        draggedCard(card);
      }

    const showDetailModal = () => {
        setIsShow(true)
    }

    const onCloseDetailModal = () => {

        setIsShow(false)

    }
    const closeComments = () => {
        setShowComments(false)
        dispatch(clearComments())
    }

    const showCommentsModal = () => {
        setShowComments(true)
    }

    const responsible = card.responsibleId ? 
                        <UserIcon type ={"smallest"} rank ={members.find((item)=> card.responsibleId == item.id).rank} /> :
                        <img width ="26px" src="../../images/add.svg" alt="add"/>;

    return (
        <div draggable = "true" onDragStart ={drag}
         className ={style.form}>
            <div className ={style.card}>{card.title}</div>
            <span className={style.priority} onClick={showDetailModal}>{priority[card.priority]}</span>
            <div className ={style.items}>
            {isShow ? <CardDetailComponent columnId ={columnId} boardId ={boardId} card={card} 
            index ={index} columnIndex ={columnIndex} onClose={onCloseDetailModal} /> : null}
                {showComments ? <CommentsModal onClose={closeComments} boardId={boardId} card={card}/> : null}
                <span className={style.show} onClick={showDetailModal}>...</span>
                <span className={style.comments} onClick={showCommentsModal}> {card.commentsCount} <img src="../../images/comment.svg" alt="comment"/></span>
                <span className={style.responsible} onClick={showDetailModal}>{responsible}</span>
            </div>
        </div> 
    )
}

const mapDispatchToProps = (dispatch) =>({
    draggedCard: (card) => dispatch(draggedCard(card))
})
  
export default connect(null,mapDispatchToProps)(Card);
