import React from "react";
import {Field, Form, Formik} from "formik";
import {useToasts} from 'react-toast-notifications';
import {changeBalance} from '../../../../API/userApi';
import styles from './UserBalance.module.scss';

export const UserBalance = ({login, balance}) => {

    const {addToast} = useToasts();

    const onSubmitBalance = (updatedBalance) => {
        changeBalance(login, updatedBalance - balance)
            .then((_) => {
                addToast('Your request to change your balance has been sent. Wait for confirmation.',
                    {appearance: 'success'});
            })
    }

    return <div className={styles.UserBalance}>
        <Formik
            initialValues={{balance: balance}}
            onSubmit={(values, {setSubmitting}) => {
                onSubmitBalance(values.balance).then((_) => {
                    setSubmitting(false)
                })
            }}
        >
            {() => <Form>
                    <div className={styles.inputBlock}>
                        <label htmlFor='balance'>Change user balance</label>
                        <Field type='number' id='balance' name='balance'/>
                        <button type='submit'>Apply</button>
                    </div>
                </Form>}
        </Formik>
    </div>
}
