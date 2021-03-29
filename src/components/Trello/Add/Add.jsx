import {useState} from 'react';
import classNames from 'classnames';
import Input from './InputTitle/InputTitle';
import style from './Add.module.scss';

const Add = ({add, column}) =>{
    let [inputing, setInputing] = useState(false);
    const handleClick = () =>{
        setInputing(inputing = true)
    }
    const accept = (title) =>{
        setInputing(inputing = false);
        add(title);
    }
    const cancel = () =>{
        setInputing(inputing = false);
    }
    if(inputing){
        return <Input column={column} accept={accept} cancel={cancel} />
    } else{
        return(
            <button className={classNames({
                [style.addButton]: !column,
                [style.addButtonColumn]: column
            })}
            onClick ={handleClick}>
             +
            </button>
        )
    }
}

export default Add;