import React, { useState } from 'react';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInfo.module.scss';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(14, 'Must be 14 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores'),
  newPassword: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(64, 'Must be 64 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores'),
  repeatPassword: Yup.string()
    .strict(false)
    .trim()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  currentPassword: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(64, 'Must be 64 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores')
    .required('Required'),
});

const UserInfo = ({ data }) => {
  const { email, login, invitesAmount } = data
  const [isRotated, setIsRotated] = useState(false)

  const toggleRotate = () => {
    setIsRotated(!isRotated)
  }

  return (
    <div className={styles.UserInfo}>
      <div className={styles.flip}>
        <div className={classNames(styles.inner, {[styles.rotated]: isRotated})}>

          <div className={styles.front}>
            <div className={styles.controlIcon}>
              <FontAwesomeIcon icon={faEdit} onClick={toggleRotate} />
            </div>
            <h2>User info</h2>
            <Formik
              initialValues={{ username: login, email: email }}
            >
              {() => (
                <Form>
                  <div className={styles.inputBlock}>
                    <label htmlFor='username'>Username</label>
                    <Field type='text' id='username' name='username' disabled />
                  </div>
                  <div className={styles.inputBlock}>
                    <label htmlFor='email'>Email</label>
                    <Field type='email' id='email' name='email' disabled />
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className={styles.back}>
            <div className={styles.controlIcon}>
              <FontAwesomeIcon icon={faTimesCircle} onClick={toggleRotate} />
            </div>
            <h2>Edit info</h2>
            <Formik
              initialValues={{ username: login, newPassword: '', repeatPassword: '', currentPassword: '' }}
              validationSchema={ProfileSchema}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className={styles.inputBlock}>
                    <label htmlFor='username'>Username</label>
                    <Field type='text' id='username' name='username' />
                    <ErrorMessage
                      text={errors.username && touched.username
                        ? errors.username
                        : ''
                      }
                      type={'input'}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <label htmlFor='newPassword'>New password</label>
                    <Field type='password' id='newPassword' name='newPassword' />
                    <ErrorMessage
                      text={errors.newPassword && touched.newPassword
                        ? errors.newPassword
                        : ''
                      }
                      type={'input'}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <label htmlFor='repeatPassword'>Repeat password</label>
                    <Field type='password' id='repeatPassword' name='repeatPassword' />
                    <ErrorMessage
                      text={errors.repeatPassword && touched.repeatPassword
                        ? errors.repeatPassword
                        : ''
                      }
                      type={'input'}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <label htmlFor='currentPassword'>Current password</label>
                    <Field type='password' id='currentPassword' name='currentPassword' />
                    <ErrorMessage
                      text={errors.currentPassword && touched.currentPassword
                        ? errors.currentPassword
                        : ''
                      }
                      type={'input'}
                    />
                  </div>
                  <button type='submit' disabled={isSubmitting}>
                    Confirm
                  </button>
                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>
    </div>
  );

}

export default UserInfo;