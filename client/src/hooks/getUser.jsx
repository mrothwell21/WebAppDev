import { React, useState } from "react";
import { message } from "antd";


const dataUser = () => {
    const [error, setError] = useState(null);

    const getUser = async (values) => {
        try {
            setError(null);

            const res = await fetch('http://localhost:5050/api/users/status',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                }
            );

            const data = await res.json();
            if (res.status === 200) {
                await user(data);
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
    return ({ error, getUser });
}
export default getUser;
