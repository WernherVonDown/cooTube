import { useState } from "react";
// import useInput from "../hooks/useInput";
// import axios from "axios";
// import config from "../config";
import { useRouter } from 'next/router'
import { Input, Button, Checkbox } from "@material-ui/core";
import useInput from "../components/hooks/useInput";
import validateEmail from "../helpers/validateEmail";
import axios from "axios";
import config from "../config";
import Header from "../components/header";

const Login = () => {
    const router = useRouter();
    const email = useInput('');
    const password = useInput('');

    const login = async () => {
        if (email.value.length && password.value.length) {
            if (validateEmail(email.value)) {
                const result = await axios.post(`${config.serverAdress}/login`, {
                    email: email.value,
                    password: password.value
                });
                console.log('RES', result);
                if (!result.data.success) {
                    alert('Invalid email or password')
                } else {
                    router.push('/')
                }
            } else {
                alert('Email is not valid')
            }
        } else {
            alert('Fill all fields')
        }
    }

    return (
        <Header isLogin={true}>
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
                <div><Button variant="contained" onClick={login}>Login</Button></div>
            </div>
        </Header>
    )
}

export default Login;