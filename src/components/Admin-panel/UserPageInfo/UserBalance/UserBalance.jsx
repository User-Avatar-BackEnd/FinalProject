import React from "react";
import style from './UserBalance.module.scss'
import {Field, Form, Formik} from "formik";
import styles from './UserBalance.module.scss'

export const UserBalance = ({balance}) => {

    return (
        <div className={style.UserBalance}>
            <Formik
                initialValues={{ balance: balance}}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.inputBlock}>
                            <label htmlFor='balance'>Change user balance</label>
                            <Field type='number' id='balance' name='balance'/>
                            <button type='submit' disabled={isSubmitting}>Apply</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
