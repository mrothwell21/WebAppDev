import { createContext, useContext, useEffect, useState } from "react";
import Login from "../Auth/Login";
import getUser from '../hooks/getUser';

const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const locallyStoredData = JSON.parse(localStorage.getItem('userData'));
    const { userRole } = getUser();

    useEffect(() => {
        if (locallyStoredData) {
            const { userToken } = locallyStoredData;
            setToken(userToken);
            setUserData(userRole);
            setIsAuthenticated(true);
        }
    }, []);
    

    const login = (newToken, newData) => {
        localStorage.setItem('userData', JSON.stringify({ userToken: newToken, user: newData }));
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const values = { token, isAuthenticated, login, userData, setUserData, userRole };
    
    return (
        <AuthContext.Provider value={{ ...values }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) };

