import Button from '@material-ui/core/Button';
import Link from "next/dist/client/link";
import { useContext } from 'react';
import AuthContext from '../../stores/authContext';

const Header = ({ children, isRegister, isLogin }) => {
    const { logged, user, inRoom} = useContext(AuthContext);
    console.log('HEADER', { logged, user})
    return (
        <div>
            <div className="navbar">
                <div className="navbar-leftside">
                    <div className="logo">CooTube</div>
                    {!inRoom && <Link href="/rooms">
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                            Public rooms
                        </Button>
                    </Link>}
                    {
                        inRoom && <div>You are in room</div>
                    }
                </div>
                <div className="navbar-rightSide">
                    {
                        !logged && (isRegister ? <Link href="/">
                            <Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                                Create room
                            </Button></Link>
                            : <Link href="/register">
                                <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                                    Register
                                </Button>
                            </Link>)
                    }
                    {
                        !logged && (isLogin ? <Link href="/">
                            <Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                                Create room
                            </Button></Link>
                            : <Link href="/login">
                                <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                                    Login
                                </Button>
                            </Link>)
                    }
                    {
                        logged &&  <div>Hello, {user.userName}<Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                        Logout
                    </Button></div>
                    }

                </div>

            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Header;