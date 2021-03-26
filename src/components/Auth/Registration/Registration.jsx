import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../AuthInput/AuthInput';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import API from '../../../config/API';
import errorsDescription from '../../../config/APIErrorsDescription';

import styles from './Registration.module.scss';

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(64, 'Must be 64 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores')
    .required('Required'),
  repeatPassword: Yup.string()
    .strict(false)
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  username: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(14, 'Must be 14 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores')
});

const Registration = ({ onLogin }) => {
  const [serverError, setServerError] = useState('')

  const clearError = () => {
    setServerError('')
  }

  return (
    <div className={styles.Registration}>
      <h2>Sign up</h2>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '', username: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            email: values.email,
            password: values.password.trim()
          }
          if (values.username) {
            data.login = values.username
          }

          API.post('/auth/register', data)
            .then(response => {
              onLogin(response.data)
            })
            .catch(error => {
              setServerError(
                errorsDescription.auth[error.response.data] ?? errorsDescription.default
              )
            })
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form onChange={clearError}>
            <AuthInput type='email' id='email' name='email' label='Email' placeholder='Email' required={true} autoComplete='off' />
            <AuthInput type='password' id='password' name='password' label='Password' placeholder='Password' required={true} />
            <AuthInput type='password' id='repeatPassword' name='repeatPassword' label='Repeat password' placeholder='Repeat password' required={true} />
            <AuthInput type='text' id='username' name='username' label='Username (optional)' placeholder='Username (optional)' required={false} />
            <button type='submit' >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.loginButton}>
        <Link to={'/login'} className={styles.loginLink}>Already have an account? Sign in</Link>
      </div>
      <ErrorMessage text={serverError} type={'form'} />
    </div>
  );

}

export default Registration;