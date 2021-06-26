import { createContext, useState } from "react";
import axios from "axios";
import config from "../config";
import { useRouter } from 'next/router'

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged,setLogged] = useState(false);
    const [inRoom, setInRoom] = useState(false)
    const router = useRouter()

    const login = async (email, password) => {
        const result = await axios.post(`${config.serverAdress}/login`, {
            email,
            password
        });
        console.log('RES', result);
        if (!result.data.success) {
            alert('Invalid email or password');
        } else {
            setUser(result.data.user)
            setLogged(true);
            router.push('/');
        }
    }

    const enterRoom = (user) => {
        setInRoom(true);
        setUser(user)
    }

    const leaveRoom = () => {
        setInRoom(false)
    }

    const logout = () => {

    }
    return <AuthContext.Provider value={{login, user, logged, enterRoom, inRoom}}>
        {children}
    </AuthContext.Provider>
}

