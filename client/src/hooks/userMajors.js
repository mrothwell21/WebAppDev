import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const getUserMajors = () => {
    const { userData } = useAuth() || { login: null };
    const [error, setError] = useState(null);

    const getMajor = async (values) => {
        try {
            const response = await fetch(`http://localhost:5050/api/major/${userData.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': userData.token
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch majors');
            }
        } catch (error) {
            console.error('Error fetching majors:', error);
        }
    };
    return ({ error, getMajor });
}
export default getUserMajors;
