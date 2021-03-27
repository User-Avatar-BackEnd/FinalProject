import React from 'react';
import { useField } from 'formik';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import styles from './AuthInput.module.scss';

const AuthInput = (props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.AuthInput}>
      <input className={styles.field} {...field} {...props} />
      <label htmlFor={props.name} className={styles.label}>{props.label}</label>
      <ErrorMessage
        text={meta.error && meta.touched
          ? meta.error
          : ''
        }
        type={'input'}
      />
    </div>
  );
};

export default AuthInput;