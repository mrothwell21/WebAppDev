import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const useLogin = () => {
    const { login } = useAuth() || { login: null };
    const [error, setError] = useState(null);

    const loginUser = async (values) => {
        try {
            setError(null);

            const res = await fetch('http://localhost:5050/api/users/auth',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                }
            );

            const data = await res.json();
            if (res.status === 200) {
                message.success('User logged-in successfully');
                await login(data.token, data.user);
            }
            else if (res.status === 404) {
                message.error('No such user');
            }
            else {
                message.error('Login failed');
            }
        }
        catch (err) { message.error(err); }
    };
    return ({ error, loginUser });
}
export default useLogin;
