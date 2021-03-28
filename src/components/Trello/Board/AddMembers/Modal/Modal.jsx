import React,{useState, useEffect, useRef} from "react";
import {connect} from 'react-redux';
import classNames from 'classnames';
import style from './Modal.module.scss';
import UserIcon from '../../../../UserIcon/UserIcon';
import Dropdown from './Dropdown';
import { useParams } from 'react-router-dom';
import {InviteUser} from '../../../../../store/ducks/duckTrello';

const Modal = ({close, members, users}) => {
    const [userName, setuserName] = useState(null);
    const [mail, setMail] = useState(null);
    const [show, setShow] = useState(true);

    const showLogin = () =>{
        setShow(true)
    }

    const showMail = () =>{
        setShow(false)
    }

    const Close = () =>{
        close();
    }

    const id = +useParams().id;

    const InviteByUserName = () =>{
        InviteUser(id, userName)
    }

    const changeMail = (e) =>{
        setMail(e.target.value)
    }

    const InviteByMail = () =>{
        InviteUser(id, mail)
    }

    return (
        <div  className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={Close}/>
                <div className ={style.toogle}>
                    <button onClick ={showLogin} className ={classNames(style.left,{[style.dis]: !show})}>Finnd by Login</button>
                    <button onClick ={showMail} className ={classNames(style.right,{[style.dis]: show})}>Finnd by Mail</button>
                </div>
                {show && <div>
                    <div className ={style.findLogin}><Dropdown invite ={setuserName} users ={users} /> </div>
                    <button className ={style.invite} onClick ={InviteByUserName}>Invite</button>
                </div>} 
                {!show && <div className ={style.findMail}><input placeholder ="Invite by mail" onChange ={changeMail} type="text"/> 
                <button className ={style.invite} onClick ={InviteByMail}>Invite</button></div>}
                <h3>Members</h3>
                <div className={style.members}>
                        {members.map((item) =><div className ={style.user} key ={item.id}><UserIcon type ={"header"} rank ={item.rank} />
                        <span>{item.login.length >= 12 ? item.login.substr(0,12) + '...' : item.login}</span>
                    </div>)}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.trello.users
  });

export default connect(mapStateToProps)(Modal);
