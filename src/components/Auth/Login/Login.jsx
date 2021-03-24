import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../AuthInput/AuthInput';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import API from '../../../config/API';
import errorsDescription from '../../../config/APIErrorsDescription';

import styles from './Login.module.scss';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .strict(false)
    .trim()
    .min(5, 'Must be 5 characters or more')
    .max(64, 'Must be 64 characters or less')
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Can only contain letters, numbers and underscores')
    .required('Required'),
});

const Login = ({ onLogin }) => {
  const [serverError, setServerError] = useState('')

  const clearError = () => {
    setServerError('')
  }

  return (
    <div className={styles.Login}>
      <h2>Sign in</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const data = {
            email: values.email,
            password: values.password
          }

          API.post('/auth/login', data)
            .then(response => {
              onLogin(response.data.access_token)
            })
            .catch(error => {
              setServerError(
                errorsDescription[error.response.data] ?? errorsDescription.default
              )
            })
        }}
      >
        {({ isSubmitting }) => (
          <Form onChange={clearError}>
            <AuthInput type='email' id='email' name='email' label='Email' placeholder='Email' required={true} autoComplete='off' />
            <AuthInput type='password' id='password' name='password' label='Password' placeholder='Password' required={true} />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.registerButton}>
        <Link to={'/registration'} className={styles.registerLink}>Don't have an account yet? Register</Link>
      </div>
      <ErrorMessage text={serverError} type={'form'} />
    </div>
  );

}

export default Login;