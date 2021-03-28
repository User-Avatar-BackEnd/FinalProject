import {connect} from 'react-redux';
import React,{useState} from 'react';
import style from './AddMembers.module.scss';
import UserIcon from '../../../UserIcon/UserIcon';
import Modal from './Modal/Modal';

const AddMembers = ({members}) =>{
    const [isShow, setIsShow] = useState(false);

    const showModal = () => {
        setIsShow(true);
    }

    const closeModal = () => {
        setIsShow(false);
    }

    return <React.Fragment>
        {isShow ? <Modal members ={members} close={closeModal} /> : null}
        <div onClick ={showModal} className ={style.wrapper}>
            {members && members.map((item,i) => {
                if(i<5){
                    return(
                        <div key ={item.id} className ={style.ico}>
                        <UserIcon type ={"small"} rank ={item.rank} />
                    </div>)
                }})}
            <div className ={style.add}><img width ="40px" src="../../images/add.svg" alt="add"/></div>
        </div>
    </React.Fragment>
}

const mapStateToProps = (state) => ({
    members: state.trello.members
});

export default connect(mapStateToProps)(AddMembers);