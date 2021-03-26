import style from './rating.module.scss'

const profilePictureUrl = {
    'NPC': "img/ranks/npc.jpg",
    'Crewman': "img/ranks/crewman.png",
    'Cossack': "img/ranks/cossack.jpg",
    'Centurion': "img/ranks/centurion.jpg",
    'Esaul': "img/ranks/cossack_captain.jpg",
    'Ataman': "img/ranks/ataman.jpg",
    'Hetman': "img/ranks/Hetman.jpg",
}

const RatingItem = ({user}) => {

    let isCurrentBackground;

    if (user.isCurrentPlayer) {
        isCurrentBackground = {
            background: `#ffffc3`
        }
    }

    return (
        <div className={style.ratingItem} style={isCurrentBackground}>
            <div className={style.ratingItemColumn}><b>{user.ratePosition}</b></div>
            <div className={style.ratingItemColumn}><img src={profilePictureUrl[user.rank]} alt='profile'/></div>
            <div className={style.ratingItemColumn}><b>{user.login}</b></div>
            <div className={style.ratingItemColumn}><b>{user.score}</b></div>
        </div>
    )
}

export const Rating = ({rating}) => {

    const topBoard = rating.topUsers;
    const underTopUsers = rating.underTopUsers;

    return (
        <div className={style.rating}>
            <h2>Rating</h2>
            <div className={style.ratingItem}>
                <div className={style.ratingItemColumn}><b>PLACE</b></div>
                <div className={style.ratingItemColumn}><b>RANK</b></div>
                <div className={style.ratingItemColumn}><b>USERNAME</b></div>
                <div className={style.ratingItemColumn}><b>POINTS</b></div>
            </div>
            {topBoard.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)}
            {underTopUsers.length !== 0 && (
                <div className={style.divider}/>
            )}
            {underTopUsers.length !== 0 && (
                underTopUsers.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)
            )}
        </div>
    )
}