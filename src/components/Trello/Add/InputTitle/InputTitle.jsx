import {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import style from '../Add.module.scss';

const InputTitle = ({accept, cancel, column}) =>{
    let [text, setText] = useState('');

    const textInput = useRef(null);

    useEffect(()=>textInput.current.focus(),[])

    const getValue = (e) =>{
        setText(text = e.target.value);
    }

    const submit = (e) =>{
        if (e.keyCode === 13) {
            accept(text)
          }
    }

    const notSubmit = () =>{
        cancel();
    }

    return <div>
            <div className={style.form}>

            <textarea
                ref = {textInput}
                onKeyDown ={submit}
                onBlur ={notSubmit}
                onChange = {getValue}
                className={classNames(style.area,{
                    [style.column]: column
                })}>
            </textarea>

            </div>
    </div>
}

export default InputTitle