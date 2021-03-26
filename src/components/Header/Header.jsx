import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import selector from './Header.selector';
import UserIcon from '../UserIcon/UserIcon';
import UserProgressBar from '../UserProgressBar/UserProgressBar';

import styles from './Header.module.scss';
import HeaderNotifications from './HeaderNotifications/HeaderNotifications';


const Header = () => {
  const { user } = useSelector(selector)

  return (
    <header className={styles.Header}>
      <img src="../../images/mainLogo.png" alt="Logo" className={styles.logo} />
      {user.role && <div className={styles.profile}>
        <Link to={'/profile'}>
          <div className={styles.username}>{user.login}</div>
        </Link>
        <Link to={'/profile'}>
          <UserProgressBar
            template={'header'}
            previousLevelScore={user.previousLevelScore}
            currentScoreAmount={user.currentScoreAmount}
            nextLevelScore={user.nextLevelScore}
          />
        </Link>
        <HeaderNotifications />
        {user.role === 'admin'
          ? <Link to={'/admin'}>
            <div className={styles.adminIcon}>
              <FontAwesomeIcon icon={faUserShield}/>
            </div>
          </Link>
          : ''
        }
        <Link to={'/profile'}>
          <div className={styles.userIcon}>
            <UserIcon type={'header'} rank={user.rank}/>
          </div>
        </Link>
      </div>
      }
    </header>)
}

export default Header;