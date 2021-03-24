import React,{useState} from "react";
import style from './PrioritySelector.module.scss'
import {priorityType} from "../../../../../store/config";

export const PrioritySelector = ({task, changePriority}) => {

    // const onPrioritySelected = (event) => {
    //     onPriorityChanged(event.target.value)
    //     console.log(event.target.value)
    // }

    let [color, setColor] = useState(task.priority)

    const colors = {
        minimal: {
            border: '2px solid #24a0d1'
        },
        normal: {
            border: '2px solid #47d124'
        },
        high: {
            border: '2px solid #dde93d'
        },
        critical: {
            border: '2px solid #d33418'
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
            default:
                return colors.minimal
        }
    }

    const handleChange = (e) =>{
        setColor(color = e.target.value)
        changePriority(e.target.value)
    }

    return (
        <div className={style.PrioritySelector}>
            <h3>Priority:</h3>
            <select defaultValue ={task.priority} onChange ={handleChange} name="priority" style={colorPriority(+color)}>
                {
                    Object.values(priorityType).map(({priority, name}) =>
                        <option key ={priority} value={priority}>{name}</option>
                    )
                }
            </select>
        </div>
    )
}
