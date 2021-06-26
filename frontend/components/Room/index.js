import { useRouter } from 'next/router';
import styles from '../../styles/room.module.scss';
import { useState, useEffect, useContext } from 'react';
import Login from './Login';
import { socket } from '../../socket';
import Main from './Main';
import AuthContext from '../../stores/authContext';

const Room = ({ roomInfo }) => {
    const [loggedInRoom, setLoggedInRoom] = useState(false);
    const [users, setUsers] = useState(false);
    const { query } = useRouter();
    const { hasPassword, roomId } = roomInfo
    const { enterRoom: contextEnterRoom } = useContext(AuthContext)
    const enterRoom = ({ userName, password }) => {
        socket.emit('enterRoom', { userName, password, roomId })
    }

    const enterRoomResponse = ({ success, users, userName, socketId }) => {
        console.log('enterRoomResponse', { success, users, userName, socketId })
        if (success) {
            contextEnterRoom({socketId, userName})
            setLoggedInRoom(true);

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

    if (!loggedInRoom) return <Login enterRoom={enterRoom} hasPassword={hasPassword} />
    return (
        <Main roomId={roomId} users={users} />
    )
}

export default Room;