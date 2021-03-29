import React,{useState} from "react";
import style from './PrioritySelector.module.scss';

export const PrioritySelector = ({card, changePriority}) => {
    const priorityType = {
        minimal: {
            priority: 0,
            name: 'Minimal'
        },
        normal: {
            priority: 1,
            name: 'Normal'
        },
        high: {
            priority: 2,
            name: 'High'
        },
        critical: {
            priority: 3,
            name: 'Critical'
        }
    }

    let [color, setColor] = useState(card.priority)

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
            <select defaultValue ={card.priority} onChange ={handleChange} name="priority" style={colorPriority(+color)}>
                {
                    Object.values(priorityType).map(({priority, name}) =>
                        <option key ={priority} value={priority}>{name}</option>
                    )
                }
            </select>
        </div>
    )
}
