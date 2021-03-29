import React,{useState, useRef} from "react";
import {connect, useDispatch} from 'react-redux';
import classNames from 'classnames';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import UserIcon from '../../../../UserIcon/UserIcon';
import Dropdown from './Dropdown/Dropdown';
import API from '../../../../../config/API';
import DelModal from './DeleteModal/DeleteModal';
import {getBoard} from '../../../../../store/ducks/duckTrello';
import style from './Modal.module.scss';

const Modal = ({close, members, users}) => {
    const [userName, setUserName] = useState(null);
    const [mail, setMail] = useState(null);
    const [show, setShow] = useState(true);

    const dispatch = useDispatch();

    const { addToast } = useToasts();

    const mailInput = useRef(null);

    const [isShow, setIsShow] = useState(false);

    const showDeleteModal = () => {
        setIsShow(true);
      }
      const closeDeleteModal = () => {
          setIsShow(false)
      }

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
        API({
            method: 'post',
            url:`/boards/${id}/invites?payload=${userName}`,
            headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
        }).then(() =>addToast(`User invited successfully!`, {appearance: 'success'}))
        .catch(() =>addToast('User does not invited!', {appearance: 'error'}))    
    }

    const changeMail = (e) =>{
        setMail(e.target.value)
    }

    const InviteByMail = () =>{
        API({
            method: 'post',
            url:`/boards/${id}/invites?payload=${mail}`,
            headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
        }).then(() =>addToast(`User invited successfully!`, {appearance: 'success'}))
        .catch(() =>addToast('User does not invited!', {appearance: 'error'}))
        mailInput.current.value = '';
    }

    const del = (query) =>{
        API({
            method: 'delete',
            url:`/boards/${id}/user?toDeleteUserId=${query}`,
            headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
        }).then(() =>{
            addToast(`Member deleted successfully!`, {appearance: 'success'});
            dispatch(getBoard(id));
        })
        .catch(() =>addToast('Member does not deleted!', {appearance: 'error'}))
    }

    return (
        <div  className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={Close}/>
                <div className ={style.toggle}>
                    <button onClick ={showLogin} className ={classNames(style.left,{[style.dis]: !show})}>Find by Login</button>
                    <button onClick ={showMail} className ={classNames(style.right,{[style.dis]: show})}>Find by Mail</button>
                </div>
                {show && <div>
                    <div className ={style.findLogin}><Dropdown invite ={setUserName} users ={users} /> </div>
                    <button className ={style.invite} onClick ={InviteByUserName}>Invite</button>
                </div>} 
                {!show && <div className ={style.findMail}><input ref ={mailInput} placeholder ="Invite by mail" onChange ={changeMail} type="text"/> 
                <button className ={style.invite} onClick ={InviteByMail}>Invite</button></div>}
                <h3>Members</h3>
                <div className={style.members}>
                        {members.map((item) =><div className ={style.user} key ={item.id}>
                            <div className ={style.member}>
                                {isShow ? <DelModal id ={item.id} login ={item.login} del ={del} close={closeDeleteModal} /> : null}
                                <UserIcon type ={"small"} rank ={item.rank} />
                                <button onClick ={showDeleteModal}><img className ={style.del} src='../../images/del.svg' alt='delete'/></button>
                            </div>
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
