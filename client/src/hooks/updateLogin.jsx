import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const updateLogin = () => {
    const { userData } = useAuth() || { login: null };
    const [error, setError] = useState(null);

    const changeTime = async () => {
        try {
            setError(null);

            const updateLogTime = await fetch('http://localhost:5050/api/users/time',
                {
                    method: 'POST',
                    body: new URLSearchParams({ username: userData.username })
                }
            );

            if (updateLogTime.status === 200) {
                message.success("Time update success");
            }
            else {
                message.error("Time update failed");
            }
        }
        catch (err) { message.error(err); }
    };
    return ({ error, changeTime });
}
export default updateLogin;
