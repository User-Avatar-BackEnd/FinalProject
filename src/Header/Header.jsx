import React from 'react';
import style from './Header.module.scss';

const profilePictureUrl = {
    'NPC': "img/ranks/npc.jpg",
    'Crewman': "img/ranks/crewman.jpg",
    'Cossack': "img/ranks/cossack.jpg",
    'Centurion': "img/ranks/centurion.jpg",
    'Cossack captain': "img/ranks/cossack_captain.jpg",
    'Ataman': "img/ranks/ataman.jpg",
    'Hetman': "img/ranks/Hetman.jpg",
}

export const Header = ({profile}) => {

    let percentage;
    let profilePic = profilePictureUrl[profile.rank];

    if (profile.currentScoreAmount >= 1000) {
        percentage = 100;
    } else {
        percentage = Math.floor((profile.currentScoreAmount / profile.nextLevelScore) * 100);
    }

    const percentageStyle = {
        width: `${percentage}%`,
    }

    return (
        <header>
            <img src="img/Trello_logo.png" alt="Logo" className={style.logo} />
            <div className={style.avatar}><img src={profilePic} alt="avatar" /></div>
            <div className={style.position}>{profile.rank}</div>
            <div className={style.progressBar}>
                <div className={style.progressBarFilled} style={percentageStyle}/>
            </div>
            <div className={style.userName}>{profile.login}</div>
        </header>)
}