import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import moment from 'moment';
import {dropComment, getComments, updateComment} from "../../../store/ducks/duckComments";
import commentsSelector from "../../../selectors/commentsSelector";
import Comment from "./Comment/Comment";
import {membersSelector} from "../../../selectors/membersSelector";
import UserIcon from "../../UserIcon/UserIcon";
import style from './Comments.module.scss';

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
        dispatch(updateComment(boardId, cardId, id, text))
        setEditableCommentId(null)
    }
    const user = useSelector(state => state.user.data.login, _.isEqual)

    return (
        <div className={style.Comments}>
            {comments.sort((a, b) => b.createdAt - a.createdAt).map(comment => <div key={comment.id}>
                <div className={style.user}>
                    <div className={style.icon}>
                        <UserIcon rank={members.get(comment.userId).rank} type={'user'}/>
                    </div>
                    <span>{members.get(comment.userId).login}</span>
                    <span className={style.date}>{getDate(comment.createdAt)}</span>
                </div>
                <div className={style.commentContainer}>
                    <Comment editable={(editableCommentId === comment.id)}
                             comment={comment}
                             onClose={onClose}
                             onSave={saveChange}/>

                        {user && comment.editable ?
                            <div className={style.action}>
                                <p onClick={() => onChange(comment.id)}>edit</p>
                                <p onClick={() => onDeleteComment(comment.id)}>delete</p>
                            </div>
                            : null}

                </div>
            </div>)}
        </div>
    )
}
