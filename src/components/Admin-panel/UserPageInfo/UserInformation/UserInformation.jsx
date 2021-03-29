import React from "react";
import {Field, Form, Formik} from "formik";
import styles from './UserInformation.module.scss'
import {useSelector} from "react-redux";
import _ from "lodash";

export const UserInformation = ({role, login}) => {
    return (
        <div className={styles.UserInformation}>
            <div className={styles.flip}>
                <h2>User info</h2>
                <Formik
                    initialValues={{username: login, email: login, role: role}}
                >
                    {() => (
                        <Form>
                            <div className={styles.inputBlock}>
                                <label htmlFor='username'>Username</label>
                                <Field type='text' id='username' name='username' disabled/>
                            </div>
                            <div className={styles.inputBlock}>
                                <label htmlFor='email'>Email</label>
                                <Field type='email' id='email' name='email' disabled/>
                            </div>
                            <div className={styles.inputBlock}>
                                <label htmlFor='role'>Role</label>
                                <Field type='text' id='role' name='role' disabled/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
