import {useAsync} from 'react-async'
import API from "../../store/config";
import React, {useEffect} from "react";

export const CardMembersSelector = () => {

    //Todo Rewrite with real API
    const {data, error, isPending} = useAsync({promiseFn: API.members, id: 1})

    return (
        <div>
            {isPending && <p>Loading</p>}
            {data &&
            <select name="members">
                {data.map((member) => <option value={member.id}>{member.name}</option>)}
            </select>}
            {error && <p>Error occurred: {error}</p>}
        </div>
    )
}
