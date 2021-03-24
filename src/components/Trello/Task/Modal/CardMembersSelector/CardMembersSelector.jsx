import {useAsync} from 'react-async'
import API from "../../../../../store/config";
import React from "react";
import style from './CardMembersSelector.module.scss'

export const CardMembersSelector = ({changeResponsible, responsible}) => {

    //Todo Rewrite with real API
    const {data, error, isPending} = useAsync({promiseFn: API.members, id: 1})

    const handleChange = (e) =>{
        changeResponsible(e.target.value)
    }

    return (
        <div className={style.CardMemberSelector}>
            <h3>Members:</h3>
            {isPending && <p>Loading</p>}
            {data &&
            <select defaultValue ={responsible} onChange ={handleChange} name="members">
                {data.map((member) => <option key ={member.id} value={member.id}>{member.name}</option>)}
            </select>}
            {error && <p>Error occurred: {error}</p>}
        </div>
    )
}
