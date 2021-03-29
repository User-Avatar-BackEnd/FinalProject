import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import API from '../../../config/API';
import errorsDescription from '../../../config/APIErrorsDescription';
import { changeUsername } from '../../../store/ducks/user/user';

import styles from './UserInfo.module.scss';

const ProfileInfoSchema = Yup.object().shape({
  username: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(14, 'Must be 14 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores'),
});

const ProfilePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(64, 'Must be 64 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores')
    .required('Required'),
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
  const { email, login } = data
  const dispatch = useDispatch()
  const history = useHistory()
  const [isRotated, setIsRotated] = useState(false)
  const [editableFields, setEditableFields] =
    useState({
    username: false,
      email: false
  })
  const [frontServerError, setFrontServerError] = useState('')
  const [backServerError, setBackServerError] = useState('')
  const { addToast } = useToasts();

  const token = localStorage.getItem('AUTH_TOKEN')

  const clearFrontError = () => {
    setFrontServerError('')
  }
  const clearBackError = () => {
    setBackServerError('')
  }

  const toggleEditUsername = () => {
    setEditableFields({...editableFields, username: !editableFields.username})
  }

  const toggleRotate = () => {
    setIsRotated(!isRotated)
  }

  const logout = () => {
    API({
      method: 'get',
      url: '/auth/logout',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        localStorage.removeItem('AUTH_TOKEN')
        history.replace('/login')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={styles.UserInfo}>
      <div className={styles.flip}>
        <div className={classNames(styles.inner, {[styles.rotated]: isRotated})}>

          <div className={styles.front}>
            <h2>User info</h2>
            <Formik
              initialValues={{ username: login ?? '', email: email ?? '' }}
              enableReinitialize
              validationSchema={ProfileInfoSchema}
              onSubmit={(values) => {
                const data = {
                  login: values.username,
                }

                if (values.username !== login) {
                  API({
                    method: 'patch',
                    url: '/account/login',
                    data,
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                    .then(() => {
                      dispatch(changeUsername(data.login))
                      toggleEditUsername()
                      addToast('Username changed successfully!', {appearance: 'success'});
                    })
                    .catch(error => {
                      setFrontServerError(
                        errorsDescription.profile[error.response.data] ?? errorsDescription.default
                      )
                    })
                  } else {
                    toggleEditUsername()
                  }
                }}
              >
              {({ errors, touched}) => (
                <Form onChange={clearFrontError}>
                  <div className={styles.inputBlock}>
                    <label htmlFor='username'>Username</label>
                    <div className={styles.editIcon}>
                      <Field type='text' id='username' name='username' disabled={!editableFields.username} />
                      {!editableFields.username
                        ? <FontAwesomeIcon icon={faEdit} onClick={toggleEditUsername} />
                        : <div className={styles.fieldButtons}>
                          <button type='submit'>
                            Confirm
                          </button>
                          <button className={styles.cancel} onClick={toggleEditUsername}>
                            Cancel
                          </button>
                        </div>
                      }
                    </div>
                    <ErrorMessage
                      text={errors.username && touched.username
                        ? errors.username
                        : ''
                      }
                      type={'input'}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <label htmlFor='email'>Email</label>
                    <Field type='email' id='email' name='email' disabled={!editableFields.email} />
                  </div>
                </Form>
              )}
            </Formik>
            <ErrorMessage text={frontServerError} type={'form'} />
            <span className={styles.changePasswordLink} onClick={toggleRotate}>Change password</span>
            <p className={styles.logoutLink} onClick={logout}>Logout</p>
          </div>

          <div className={styles.back}>
            <div className={styles.closeIcon}>
              <FontAwesomeIcon icon={faTimesCircle} onClick={toggleRotate} />
            </div>
            <h2>Change password</h2>
            <Formik
              initialValues={{ newPassword: '', repeatPassword: '', currentPassword: '' }}
              enableReinitialize
              validationSchema={ProfilePasswordSchema}
              onSubmit={(values, { setSubmitting }) => {
                const data = {
                  oldPassword: values.currentPassword,
                  newPassword: values.newPassword
                }

                API({
                  method: 'patch',
                  url: '/account/password',
                  data,
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                  .then((response) => {
                    toggleRotate()
                    addToast('Password changed successfully!', {appearance: 'success'});
                  })
                  .catch(error => {
                    setBackServerError(
                      errorsDescription.profile[error.response.data] ?? errorsDescription.default
                    )
                  })
              }}
            >
              {({ errors, touched }) => (
                <Form onChange={clearBackError}>
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
                  <button type='submit'>
                    Confirm
                  </button>
                </Form>
              )}
            </Formik>
            <ErrorMessage text={backServerError} type={'form'} />
          </div>

        </div>
      </div>
    </div>
  );

}

export default UserInfo;
