import { useState } from "react";
import useInput from "../components/hooks/useInput";
// import axios from "axios";
// import config from "../config";
import { useRouter } from 'next/router'
import { Input, Button, Checkbox } from "@material-ui/core";
import validateEmail from "../helpers/validateEmail";
import axios from "axios";
import config from "../config";
import Header from "../components/header";
const Register = () => {
    const router = useRouter();
    const email = useInput('');
    const userName = useInput('');
    const password1 = useInput('');
    const password2 = useInput('');

    const register = async () => {
        if (
            email.value.length &&
            userName.value.length &&
            password1.value.length &&
            password2.value.length
        ) {
            if (validateEmail(email.value)) {
                if (password1.value === password2.value) {
                    const result = await axios.post(`${config.serverAdress}/register`, {
                        email: email.value,
                        password: password1.value,
                        userName: userName.value
                    });
                    console.log('REGISTER RES', result)
                    if (result.data.success) {
                        router.push('/login')
                    } else {
                        alert(result.data.msg || 'Error');
                    }
                } else {
                    alert("passwords don't match")
                }
            } else {
                alert('Email is not valid')
            }
        } else {
            alert('Fill all fields')
        }
    }

    return (
        <Header isRegister={true}>
            <div className="formWrapper">
                <div>
                    <h2>Register</h2>
                    <div>
                        <div>Email</div>
                        <div><Input {...email} Input type="text" /></div>
                    </div>
                    <div>
                        <div>UserName</div>
                        <div><Input {...userName} type="text" /></div>
                    </div>
                    <div>
                        <div>Password</div>
                        <div><Input {...password1} type="password" /></div>
                    </div>
                    <div>
                        <div>Confirm your password</div>
                        <div><Input {...password2} type="password" /></div>
                    </div>
                </div>
                <div><Button variant="contained" onClick={register}>register</Button></div>
            </div>
        </Header>
    )
}

export default Register;