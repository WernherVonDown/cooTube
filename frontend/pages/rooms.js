import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import config from '../config'
import A from '../components/common/A'
import { Button } from "@material-ui/core";
import Header from '../components/header';
import AuthContext from '../stores/authContext';
import { PAGES } from '../stores/consts';

const Rooms = ({rooms}) => {
  //  const { setActivePage } = useContext(AuthContext);
    // const [rooms, setRooms] = useState([])
    // console.log("AAAA", setActivePage)
    // useEffect(async () => {
    //     setActivePage(PAGES.ROOMS);
    //     const fetchedRooms = await getRooms();
    //     setRooms(fetchedRooms)

    // }, []);

    // const getRooms = async () => {
    //     const res = await axios.get(`${config.serverAdress}/rooms`)
    //     console.log('EEEEEEE', `${config.serverAdress}/rooms`, res?.data)
    //     const data = res.data;
    //     return data || []
    // }

    return (
        <div className="roomsWrapper">
            Rooms:
            <div>
                <ul>
                    {rooms.map(r => {
                        return <li key={r.roomId}>
                            <A href={`/room/${r.roomId}`} text={r.roomName} />
                            <div>{r.description}</div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Rooms;

export async function getServerSideProps(context) {
    const res = await axios.get(`${config.serverAdress}/rooms`)
    //const res = await axios.get(`http://backend:8080/rooms`)
    const data = res.data;

    return {
        props: { fallback: true, rooms: data || [] }, // will be passed to the page component as props
    }
}