import Button from '@material-ui/core/Button';
import Link from "next/dist/client/link";

const Header = ({ children, isRegister, isLogin }) => {
    return (
        <div>
            <div className="navbar">
                <div className="navbar-leftside">
                    <div className="logo">CooTube</div>
                    <Link href="/rooms">
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                            Public rooms
                        </Button>
                    </Link>
                </div>
                <div className="navbar-rightSide">
                    {
                        isRegister ? <Link href="/">
                            <Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                                Create room
                            </Button></Link>
                            : <Link href="/register">
                                <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                                    Register
                                </Button>
                            </Link>
                    }
                    {
                        isLogin ? <Link href="/">
                            <Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                                Create room
                            </Button></Link>
                            : <Link href="/login">
                                <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                                    Login
                                </Button>
                            </Link>
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