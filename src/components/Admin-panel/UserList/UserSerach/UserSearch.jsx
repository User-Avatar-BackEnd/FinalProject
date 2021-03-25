import React from "react";
import style from './UserSearch.module.scss'
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import debounce from 'lodash.debounce';

export const UserSearch = ({onSearch}) => {

    const handleChange = (event) => {
        debounce(() => {
            onSearch(event.target.value.trim())
        }, 1000)()
    }

    return (
        <div className={style.UserSearch}>
            <input type="text" placeholder='search user...' onChange={handleChange}/>
            <div className={style.icon}>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
    )
}
