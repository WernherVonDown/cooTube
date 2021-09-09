import axios from 'axios';
import config from '../../config';
import NoRoomPage from '../../components/NoRoomPage';
import Room from '../../components/Room';

export default function ({noRoom, roomInfo}) {
    console.log(roomInfo)
    if (noRoom) return <NoRoomPage/>;
    return <Room roomInfo={roomInfo}/>
}

export async function getServerSideProps({ params }) {
    const res = await axios.get(`${config.serverAdress}/rooms/${params.id}`)
    //const res = await axios.get(`http://backend:8080/rooms/${params.id}`)
    const data = res.data;
    if (!data) {
        return {
            props: { noRoom: true }
        }
    }

    delete data.password;
    return {
        props: { roomInfo: data }, // will be passed to the page component as props
    }
}