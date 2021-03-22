import React from "react";
import style from './PrioritySelector.module.scss'
import {priorityType} from "../../store/config";

export const PrioritySelector = ({}) => {

    // const onPrioritySelected = (event) => {
    //     onPriorityChanged(event.target.value)
    //     console.log(event.target.value)
    // }

    return (
        <div className={style.PrioritySelector}>
            <select name="priority">
                {
                    Object.values(priorityType).map(({priority, name}) =>
                        <option value={priority}>{name}</option>
                    )
                }
            </select>
        </div>
    )
}
