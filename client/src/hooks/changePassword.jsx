import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const changePassword = () => {
    const { userData } = useAuth() || { login: null };
    const [error, setError] = useState(null);

    const passChange = async (values) => {
        try {
            setError(null);
            const res = await fetch("http://localhost:5050/api/password/change", {
                method: "POST",
                body: new URLSearchParams({ username: values.username, currentPassword: values.currentPassword, newPassword: values.newPassword, confirmPassword: values.confirmPassword }),
                headers: {
                    'x-auth': token
                }
            });
            console.log("fetch");

            const data = await res.json();
            if (res.status === 200) {
                console.log("success");
                message.success("Password changed sucessfully!");
                const data = await response.json();
                localStorage.setItem("userData", JSON.stringify(data.token));
                return {success: true};
            }
            else {
                message.error("Something went wrong!");
                return {success: false};
            }
        }
        catch (err) { message.error(err); }
    };
    return ({ error, passChange });
}
export default changePassword;
