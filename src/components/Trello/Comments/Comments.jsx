import React, {useEffect, useState} from "react";
import style from './Comments.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {dropComment, getComments, updateComment} from "../../../store/ducks/duckComments";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import commentsSelector from "../../../selectors/commentsSelector";
import moment from 'moment'
import Comment from "./Comment";
import {membersSelector} from "../../../selectors/membersSelector";
import UserIcon from "../../UserIcon/UserIcon";

export const Comments = ({boardId, cardId}) => {
    const dispatch = useDispatch()
    const comments = useSelector(commentsSelector)
    const [editableCommentId, setEditableCommentId] = useState(null)

    const members = useSelector(membersSelector)

    useEffect(() => {
        dispatch(getComments(boardId, cardId))
    })

    const getDate = (date) => {
        return moment(date).format('DD MMM, YYYY, HH:mm')
    }

    const onDeleteComment = (id) => {
        dispatch(dropComment(boardId, cardId, id))
    }

    const onChange = (id) => {
        setEditableCommentId(id)
    }

    const onClose = () => {
        setEditableCommentId(null)
    }

    const saveChange = (id, text) => {
        console.log("saveChange")
        dispatch(updateComment(boardId, cardId, id, text))
        setEditableCommentId(null)
    }

    return (
        <div className={style.Comments}>
            {comments.map(comment => <div key={comment.id}>
                <div className={style.user}>
                    <div className={style.icon}>
                        <UserIcon rank={members.get(comment.userId).rank} type={'header'}/>
                    </div>
                    <span>{members.get(comment.userId).login}</span>
                    <span className={style.date}>{getDate(comment.createdAt)}</span>
                </div>
                <div className={style.commentContainer}>
                    <Comment editable={(editableCommentId === comment.id)}
                             comment={comment}
                             onClose={onClose}
                             onSave={saveChange}/>
                    <div className={style.action}>
                        {comment.editable ? <p onClick={() => onChange(comment.id)}>edit</p> : null}
                        <p onClick={() => onDeleteComment(comment.id)}>delete</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
