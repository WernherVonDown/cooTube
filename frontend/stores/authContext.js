import { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useRouter } from 'next/router'
import { PAGES } from "./consts";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [inRoom, setInRoom] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(null);
    const [activePage, setActivePage] = useState(PAGES.INDEX);
    const [usersInRoom, setUsersInRoom] = useState([])


    const router = useRouter();

    useEffect(() => {
        login()
    }, [])

    const login = async (email = null, password = null) => {
        const result = await axios.post(`${config.serverAdress}/auth/login`, {
            email,
            password
        }, {withCredentials: true,});

        if (!result.data.success) {
            alert('Invalid email or password');
        } else {
            setUser(result.data.user)
            setLogged(true);
            router.push('/');
        }
    }

    const enterRoom = (user, roomId) => {
        setInRoom(true);
        setUser(user);
        setCurrentRoom(roomId);
        setActivePage(PAGES.ROOM);
    }

    const leaveRoom = () => {
        setInRoom(false)
    }

    const logout = () => {

    }
    return <AuthContext.Provider
        value=
            {
                {
                    login, 
                    user, 
                    logged, 
                    enterRoom, 
                    inRoom, 
                    currentRoom, 
                    activePage,
                    setActivePage,
                    usersInRoom,
                    setUsersInRoom
                }
            }
        >
        {children}
    </AuthContext.Provider>
}

