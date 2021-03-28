import React from 'react'
import Select from 'react-select'

const DropDown = ({users, invite}) => {
    const options = users ? users.map((item) =>({value: item.id, label: item.login})) : [];

    const select = (e) =>{
        invite(e.value)
    }

    return <Select onChange={e =>select(e)} placeholder='Find members...'  options={options} />
}

export default DropDown;