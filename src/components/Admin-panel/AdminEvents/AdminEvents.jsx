import React, { useState, useEffect } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useToasts } from 'react-toast-notifications';
import API from '../../../config/API';

import styles from './AdminEvents.module.scss';

const AdminEvents = () => {
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const { addToast } = useToasts();

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    setLoading(true)
    let isCancelled = false

    API({
      method: 'get',
      url: `/admin/events`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!isCancelled) {
          setEvents(response.data)
          console.log(events)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => isCancelled = true;
  },[])

  const changeScore = (event) => {
    const newData = events.map(item => {
      if (item.name === event.target.id) {
        return {...item, score: event.target.value}
      }
      return item
    })

    setEvents(newData)
  }

  const submitChanges = () => {
    API({
      method: 'put',
      url: `/admin/events`,
      data: events,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        addToast('Changes successfully applied!', {appearance: 'success'});
      })
      .catch(() => {
        addToast('Something went wrong...Please try again later', {appearance: 'error'});
      })
  }

  return (
    <div className={styles.AdminEvents}>
      <h1>Events settings</h1>
      {loading
        ? <LoopCircleLoading color={'orange'} style={{position: 'relative', margin: '200px auto'}}/>
        : <>
        <div className={styles.eventsContainer}>
          {events.map(event => {
            return <div className={styles.eventItem} key={event.name}>
              <label htmlFor={event.name}>{event.name}</label>
              <div>
                <input type="number" id={event.name} value={event.score} onChange={changeScore} /> points
              </div>
            </div>
          })}
          </div>
        <button onClick={submitChanges}>
          Confirm
        </button>
        </>
      }
    </div>
  );

}

export default AdminEvents;