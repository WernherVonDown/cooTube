import useInput from "../hooks/useInput";
import { useContext } from "react";
import AuthContext from "../../stores/authContext";
const Login = ({ hasPassword, enterRoom }) => {
    const {logged, user} = useContext(AuthContext);
    const userName = useInput(logged ? user.userName : '');
    const password = useInput('');

    const validateData = () => {
        const isUserName = userName.value;
        const isPassword = password.value;
        if (hasPassword) return isUserName && isPassword;
        return isUserName;
    } 

    const onLogin = () => {
            const dataIsValid = validateData();
            if (dataIsValid) {
                enterRoom({password: password.value, userName: userName.value})
            } else {
                alert('Заполните все поля');
            }
    }

    return (
        <div className="formWrapper">
            <div>
                <div >User Name</div>
                <input {...userName} type="text" />
            </div>
            {hasPassword && <div>
                <div>Password</div>
                <input {...password} type="password" />
            </div>}
            <input onClick={onLogin} type="button" value="Enter" />
        </div>
    )
}

export default Login;