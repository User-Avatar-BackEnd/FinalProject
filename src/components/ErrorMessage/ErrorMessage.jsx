import React from 'react';
import classNames from 'classnames';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ text, type }) => {

  return (
    <div className={classNames(styles.ErrorMessage, styles[type])}>
      {text}
    </div>
  );

}

export default ErrorMessage;