import { useRouter } from 'next/router';
import styles from '../../styles/room.module.scss';
import { useState, useEffect } from 'react';
import Login from './Login';
import { socket } from '../../socket';
import Main from './Main';

const Room = ({ roomInfo }) => {
    const [logged, setLogged] = useState(false);
    const [users, setUsers] = useState(false);
    const { query } = useRouter();
    const { hasPassword, roomId } = roomInfo


    const enterRoom = ({ userName, password }) => {
        socket.emit('enterRoom', { userName, password, roomId })
    }

    const enterRoomResponse = ({ success, users, userName }) => {
        console.log('enterRoomResponse', { success, users, userName })
        if (success) {
            setLogged(true);
        }
    }

    const subscribe = () => {
        socket.on('enterRoom', enterRoomResponse);
        socket.on('users', (data) => {
            setUsers(data)
        })
    }

    useEffect(() => {
        subscribe()
        //socket.emit('enterRoom', {hello: 'world'})
        return () => {
            //   cleanup
        };
    }, []);

    if (!logged) return <Login enterRoom={enterRoom} hasPassword={hasPassword} />
    return (
        <Main roomId={roomId} users={users} />
    )
}

export default Room;