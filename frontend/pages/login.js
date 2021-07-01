import { useContext, useEffect } from "react";
import { Input, Button, Checkbox } from "@material-ui/core";
import useInput from "../components/hooks/useInput";
import validateEmail from "../helpers/validateEmail";
import Header from "../components/header";
import AuthContext from "../stores/authContext";
import { PAGES } from "../stores/consts";

const Login = () => {
    const email = useInput('');
    const password = useInput('');
    const { login, setActivePage } = useContext(AuthContext);

    useEffect(() => {
        setActivePage(PAGES.LOGIN);
    }, []);

    const checkLoginData = async () => {
        if (email.value.length && password.value.length) {
            if (validateEmail(email.value)) {
                login(email.value, password.value)
            } else {
                alert('Email is not valid')
            }
        } else {
            alert('Fill all fields')
        }
    }

    return (
        <div className="formWrapper">
            <div>
                <h2>Login</h2>
                <div>
                    <div>Email</div>
                    <div><Input {...email} type="text" /></div>
                </div>
                <div>
                    <div>Password</div>
                    <div><Input {...password} type="password" /></div>
                </div>
            </div>
            <div><Button variant="contained" onClick={checkLoginData}>Login</Button></div>
        </div>
    )
}

export default Login;