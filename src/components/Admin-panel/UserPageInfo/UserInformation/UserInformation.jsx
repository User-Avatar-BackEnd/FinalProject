import React, {useState} from "react";
import styles from './UserInformation.module.scss'
import {Field, Form, Formik} from "formik";
import {useParams} from 'react-router-dom'
import useLoadedHistory from "../../../../hooks/useLoadedHistory";
import useLoadUsers from "../../../../hooks/useLoadUsers";
import _ from "lodash";

export const UserInformation = ({data}) => {
    const {email, role, invitesAmount} = data
    // const [user, setUser] = useState([])

    const {login} = useParams()

    const {history} = useLoadedHistory(login)
    const {users} = useLoadUsers()
    console.log(JSON.stringify(history) + 'history')

    // setUser(_.filter(users.users, (v) => _.includes(v.login, login)))
    // console.log(user)
    return (
        <div className={styles.UserInformation}>
            <div className={styles.flip}>
                <h2>User info</h2>
                <Formik
                    initialValues={{username: login, email: email, role: role}}
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
