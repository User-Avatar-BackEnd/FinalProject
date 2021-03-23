import React from "react";
import style from './PrioritySelector.module.scss'
import {priorityType} from "../../../../store/config";

export const PrioritySelector = ({task}) => {

    // const onPrioritySelected = (event) => {
    //     onPriorityChanged(event.target.value)
    //     console.log(event.target.value)
    // }

const colors = {
    minimal: {
        border: '1px solid #24a0d1'
    },
    normal: {
        border: '1px solid #47d124'
    },
    high: {
        border: '1px solid #dde93d'
    },
    critical: {
        border: '1px solid #d33418'
    }
}
    const colorPriority = (priority) => {
        switch (priority) {
            case 0:
                return colors.minimal
            case 1:
                return colors.normal
            case 2:
                return colors.high
            case 3:
                return colors.critical
        }
    }

    return (
        <div className={style.PrioritySelector}>
            <h3>Priority:</h3>
            <select name="priority" style={colorPriority(task.priority)}>
                {
                    Object.values(priorityType).map(({priority, name}) =>
                        <option value={priority}>{name}</option>
                    )
                }
            </select>
        </div>
    )
}
