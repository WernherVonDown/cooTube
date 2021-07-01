import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import config from '../config'
import A from '../components/common/A'
import { Button } from "@material-ui/core";
import Header from '../components/header';
import AuthContext from '../stores/authContext';
import { PAGES } from '../stores/consts';

const Rooms = ({ rooms }) => {
    const { setActivePage } = useContext(AuthContext);
    console.log("AAAA", setActivePage)
    useEffect(() => {
        setActivePage(PAGES.ROOMS);
    }, []);
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

export async function getStaticProps(context) {
    const res = await axios.get(`${config.serverAdress}/rooms`)
    const data = res.data;

    return {
        props: { rooms: data || [] }, // will be passed to the page component as props
    }
}