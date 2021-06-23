import styles from '../../styles/room.module.scss';
import { useState, useEffect } from 'react';
import { socket } from '../../socket';

const Main = ({roomId, users}) => {
   // const [users, setUsers] = useState([]);

    const subscribe = () => {
        // socket.on('users', (data) => {
        //     setUsers(data)
        // })
    }

    useEffect(() => {
        subscribe()
        return () => {
         //   cleanup
        };
    }, []);

    return (
        <div className={styles.test}><h1>{`Room ${roomId}, users: ${users.length}`}</h1></div>
    )
}

export default Main;