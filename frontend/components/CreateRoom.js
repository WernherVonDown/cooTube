import { useState } from "react";
import useInput from "./hooks/useInput";
import axios from "axios";
import config from "../config";
import { useRouter } from 'next/router'
import { Input, Button, Checkbox } from "@material-ui/core";

const CreateRoom = () => {
    const router = useRouter();
    const [isPublic, setIsPublic] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const roomId = useInput('');
    const password = useInput('');
    const roomName = useInput('');
    const description = useInput('');

    const checkRoomId = () => {
        return !!roomId.value;
    }

    const checkData = () => {
        if (isPublic) {
            const descData = checkRoomId() && roomName.value;
            return descData && {
                roomId: roomId.value,
                roomName: roomName.value,
                description: description.value,
                isPublic,
                password: hasPassword ? password.value : ''
            }
        } else {
            return checkRoomId() && {
                roomId: roomId.value,
                password: hasPassword ? password.value : ''
            }
        }
    }

    const onCreateRoom = async () => {
        const data = checkData();
        const test = await axios.get(`${config.serverAdress}/rooms`)
        console.log(test)
        if (data) {
            const res = await axios.post(`${config.serverAdress}/rooms`, data);
            if (!res.data) {
                alert('Комната с таким Id уже существует!')
            } else {
                router.push(`room/${roomId.value}`)
            }
        } else {
            alert('неверные данные')
        }
    }

    return (
        <div className="formWrapper">
            <div>
                <h2>Create room</h2>
                <div>
                    public
                    <Checkbox color="primary" checked={isPublic} onChange={() => setIsPublic(!isPublic)} type="checkbox" />
                </div>
                <div>RoomId</div>
                <div><Input {...roomId} type="text" /></div>
                <div></div>
            </div>
            {isPublic && <div>
                <div>Name</div>
                <div><Input {...roomName} type="text" /></div>

            </div>}
            {isPublic && <div>
                <div>Desctiption</div>
                <div><Input {...description} type="text" /></div>
            </div>}
            {!isPublic && <div>
                <div>Password  <Checkbox color="primary" checked={hasPassword} onChange={() => setHasPassword(!hasPassword)} type="checkbox" /> </div>
                {hasPassword && <div><Input {...password} type="password" /></div>}
            </div>}
            <div><Button variant="contained" onClick={onCreateRoom}>create</Button></div>
        </div>
    )
}

export default CreateRoom;