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
                // console.log('Fetched user data:', data);
                return data;
            }
            return null;
        } catch (err) {
            message.error("Something went wrong!");
            console.error('Error fetching user data:', err);
            return null;
        }
        
        
        
        
        
        
        // try {
        //     setError(null);
        //     const res = await fetch("http://localhost:5050/api/password/change", {
        //         method: "POST",
        //         body: new URLSearchParams({ username: values.username, currentPassword: values.currentPassword, newPassword: values.newPassword, confirmPassword: values.confirmPassword }),
        //         headers: {
        //             'x-auth': token
        //         }
        //     });

        //     const data = await res.json();
        //     if (res.status === 200) {
        //         message.success("Password changed sucessfully!");
        //         const data = await response.json();
        //         localStorage.setItem("userData", JSON.stringify(data.token));
        //         return {sucess: true};
        //     }
        //     else {
        //         message.error("Something went wrong!");
        //         return {sucess: false};
        //     }
        // }
        // catch (err) { message.error(err); }
    };
    return ({ error, getStatus });
}
export default userStatus;
