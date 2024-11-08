import { createContext, useContext, useEffect, useState } from "react";
import Login from "../Auth/Login";

const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const locallyStoredData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        if (locallyStoredData) {
            const { userToken, user } = locallyStoredData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem('userData', JSON.stringify({ userToken: newToken, user: newData }));
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const values = { token, isAuthenticated, login, userData, setUserData };
    
    return (
        <AuthContext.Provider value={{ ...values }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) };

