import {connect} from 'react-redux';
import API from "../../../../../store/config";
import React from "react";
import style from './CardMembersSelector.module.scss';

const CardMembersSelector = ({changeResponsible, responsibleId, members}) => {
    const handleChange = (e) =>{
        changeResponsible(e.target.value)
    }

    return (
        <div className={style.CardMemberSelector}>
            <h3>Members:</h3>
            <select defaultValue ={responsibleId} onChange ={handleChange} name="members">
                <option value={null} style={{display:"none"}}>None</option>
                {members.map((member) => <option key ={member.id} value={member.id}>{member.login}</option>)}
            </select>
        </div>
    )
}

const mapStateToProps = (state) =>({
    members: state.board.trello.members
})
  
export default connect(mapStateToProps)(CardMembersSelector);