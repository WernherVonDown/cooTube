import Button from '@material-ui/core/Button';
import Link from "next/dist/client/link";
import { useContext } from 'react';
import AuthContext from '../../stores/authContext';
import { PAGES, HEADER_BUTTONS } from '../../stores/consts';

const Header = ({ children, isRegister, isLogin }) => {
    const { logged, user, inRoom, usersInRoom: users, activePage } = useContext(AuthContext);
    console.log('HEADER', { logged, user })

    const getButton = ({ btnKey }) => {
        switch (btnKey) {
            case HEADER_BUTTONS.ROOMS_BTN:
                return (
                    <Link href="/rooms" key={btnKey}>
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                            Public rooms
                        </Button>
                    </Link>
                );
            case HEADER_BUTTONS.LOGIN_BTN:
                return (
                    <Link href="/login" key={btnKey}>
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                );
            case HEADER_BUTTONS.REGISTER_BTN:
                return (
                    <Link href="/register" key={btnKey}>
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary">
                            Register
                        </Button>
                    </Link>
                )
            case HEADER_BUTTONS.INDEX_PAGE_BTN:
                return (
                    <Link href="/" key={btnKey}>
                        <Button className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                            Back
                        </Button>
                    </Link>
                );
            case HEADER_BUTTONS.LOGOUT_BTN: {
                return (
                    <Button key={btnKey} className="marginLeftRight navbar-button" variant="contained" color="primary" href="/">
                        Logout
                    </Button>
                )
            }
        }
    }

    const getLeftSideButtons = () => {
        const notOnRoomsPage = activePage !== PAGES.ROOMS;
        const notInRoom = activePage !== PAGES.ROOM;
        const leftSideButtonKeys = [
            {
                btnKey: HEADER_BUTTONS.ROOMS_BTN,
                state: notOnRoomsPage && notInRoom
            },
            {
                btnKey: HEADER_BUTTONS.INDEX_PAGE_BTN,
                state: !notOnRoomsPage && notInRoom
            }

        ];

        // console.log('EEEEE', leftSideButtonKeys)
        // console.log('BBB', leftSideButtonKeys.filter(({ state }) => state))
        // console.log('FFFF', leftSideButtonKeys.filter(({ state }) => state).map(getButton))

        return leftSideButtonKeys.filter(({ state }) => state).map(getButton);
    }

    const renderLeftSideButtons = () => {
        const leftSideButtons = getLeftSideButtons();
      //  console.log('aaaaaaaaa', leftSideButtons)

        return (
            <div className="navbar-buttonsWrapper">
                {leftSideButtons}
            </div>
        )
    }

    const renderLeftSide = () => {
        return (
            <div className="navbar-leftside">
                <div className="logo">CooTube</div>
                {renderLeftSideButtons()}
                {
                    inRoom && <div>You are in room</div>
                }
            </div>
        )
    }

    const getRightSideButton = () => {
        const onLoginPage = activePage === PAGES.LOGIN;
        const onRegisterPage = activePage === PAGES.REGISTER;
        const onIndexPage = activePage === PAGES.INDEX
        const onRoomsPage = activePage === PAGES.ROOMS;

        const rightSideButtonKeys = [
            {
                btnKey: HEADER_BUTTONS.INDEX_PAGE_BTN,
                state: (onLoginPage || onRegisterPage) && !logged
            },
            {
                btnKey: HEADER_BUTTONS.LOGIN_BTN,
                state: (onRegisterPage || onIndexPage || onRoomsPage) && !logged
            },
            {
                btnKey: HEADER_BUTTONS.REGISTER_BTN,
                state: (onLoginPage  || onIndexPage || onRoomsPage) && !logged
            },
            {
                btnKey: HEADER_BUTTONS.LOGOUT_BTN,
                state: logged
            },
        ];

        return rightSideButtonKeys.filter(({ state }) => state).map(getButton);
    }

    const renderRightSideButtons = () => {
        const rightSideButtons = getRightSideButton();
        return (
            <div className="navbar-buttonsWrapper">
                {logged && user.userName}
                {rightSideButtons}
            </div>
        )
    }

    const renderRightSide = () => {
        return (
            <div className="navbar-rightSide">
                {renderRightSideButtons()}
            </div>
        )
    }

    return (
        <div>
            <div className="navbar">
                {renderLeftSide()}
                {renderRightSide()}
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Header;