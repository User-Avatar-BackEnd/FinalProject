import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch} from 'react-redux';
import {deleteCard, setdeleteCard, changeCard, setdropCard} from '../../../../../store/ducks/duckTrello';
import style from './CardDetailModal.module.scss'
import {PrioritySelector} from "../PrioritySelector/PrioritySelector";
import CardMembersSelector from "../CardMembersSelector/CardMembersSelector";

const CardDetailComponent = ({boardId, onClose, commentFocused, card, index, columnIndex, columnId, columns, moveCard, removeCard}) => {
    const dispatch = useDispatch();
 
    const [isWritable, setIsWritable] = useState(false)
    let [changedCard, setCard] = useState({
            id: card.id,
            title: card.title,
            description: card.description,
            priority: card.priority,
            responsibleId: card.responsibleId,
            isHidden: card.isHidden,
            commentsCount: card.commentsCount,
            columnId: columnId
    })

    const [title, setTitle] = useState(card.title);
    const changeTitle = (e) =>{
        setTitle(e.target.value);
    }

    const [priority, setPriority] = useState(card.priority);
    const changePriority = (priority) =>{
        setPriority(+priority)
    }

    const [predescription, setPre] = useState('');
    const changePre = (e) =>{
        setPre(e.target.value);
    }

    const [description, setDescription] = useState(card.description);
    const changeDescription = () =>{
        setIsWritable(false);
        setDescription(predescription);
    }

    const closeDescription = () => {
        setIsWritable(false);
    }

    const [responsibleId, setResponsible] = useState(card.responsibleId);
    const changeResponsible = (responsibleId) =>{
        setResponsible(responsibleId)
    }

    const [hidden, setHidden] = useState(card.isHidden);
    const changeHidden = (e) =>{
        setHidden(e.target.checked)
    }

    const [column, setColumn] = useState(columnId)
    const changeColumn = (e) =>{
        setColumn(+e.target.value)
    }

    const textInput = useRef(null)
    const addTextarea = () => {
        setIsWritable(true)
    }

    useEffect(() => {
        isWritable && handleFocus()
    })

    const handleFocus = () => {
        textInput.current.focus()
    }
   
    const preventDrag = (e) =>{
        e.stopPropagation();
        e.preventDefault();
    }

    const del = () =>{
        dispatch(deleteCard(boardId, card.id, columnIndex, index));
    }

    const close = () =>{
        onClose();
    }

    const submit = () =>{
        setCard(changedCard={
            id: card.id,
            title: title,
            description: description,
            priority: priority,
            responsibleId: responsibleId,
            isHidden: hidden,
            commentsCount: card.commentsCount,
            columnId: column
        })
        dispatch(changeCard(boardId, changedCard.id, columnIndex, index, changedCard));
        if(column !== columnId){
            removeCard(columnIndex, index);
            moveCard(changedCard, columns.findIndex((item) => column == item.id ));
        }
        onClose();
    }

    return (
        <div draggable = "true" className={style.window} onDragStart ={preventDrag}>
            <div className={style.CardDetailModal}>
                <div className={style.title}>
                    <img src="../../images/edit.png" alt="" className={style.icon}/>
                    <textarea onChange ={changeTitle} value ={title} />
                    <span className={style.close} onClick={close}/>
                </div>
                <div><input checked ={hidden}  onChange ={changeHidden} type="checkbox"/><span>Hide</span></div>
                <PrioritySelector changePriority ={changePriority} card={card}/>
                <div className={style.description}>
                    <img src="../../images/description.png" alt="" className={style.icon}/>
                    <h3>Description</h3>
                </div>

                {!isWritable ? <p className={style.changeDescription} title='add description' 
                onClick={addTextarea} >{description}</p>
                    : <div className={style.textareaChange}>
                        <textarea onChange ={changePre} placeholder='add description...' defaultValue ={description} ref={textInput} />
                        <div className={style.editControls}>
                            <button className ={style.save} onClick={changeDescription}>Save</button>
                            <a className={style.close} title='close' onClick={closeDescription}/>
                        </div>
                    </div>
                }
                <CardMembersSelector changeResponsible ={changeResponsible} responsibleId ={responsibleId}/>
                <div className ={style.columnSelect}>
                    <h3>Column:</h3>
                    <select defaultValue ={columns[columnIndex].id} onChange ={changeColumn} name="columns">
                        {columns.map((column) => <option key ={column.id} value={column.id}>{column.title}</option>)}
                    </select>
                </div>
                <div className={style.dispatch}>
                    <button onClick={submit} className ={style.save}>save</button>
                    <button onClick={del} className ={style.del}>delete</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    columns: state.trello.board.columns
});

const mapDispatchToProps = (dispatch) =>({
    removeCard: (columnIndex, index) => dispatch(setdeleteCard(columnIndex, index)),
    moveCard: (changedCard,index) => dispatch(setdropCard(changedCard,index))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(CardDetailComponent);