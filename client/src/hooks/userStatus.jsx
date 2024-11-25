import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const userStatus = () => {
    const { userData } = useAuth() || { login: null };
    const [error, setError] = useState(null);

    const getStatus = async (token) => {
        
        try {
            const res = await fetch('http://localhost:5050/api/users/status', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Auth': token
                }
            });

            console.log('User data response:', res.status);
            if (res.status === 200) {
                const data = await res.json();
                console.log('Fetched user data:', data);
                return data;
            }
            return null;
        } catch (err) {
            message.error("Something went wrong!");
            console.error('Error fetching user data:', err);
            return null;
        }
        
    };
    return ({ error, getStatus });
}
export default userStatus;
