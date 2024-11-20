import { createContext, useContext, useEffect, useState } from "react";
import Login from "../Auth/Login";

const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchUserStatus = async (token) => {
        console.log('Fetching user data with token:', token);
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
            console.error('Error fetching user data:', err);
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            
            const locallyStoredData = JSON.parse(localStorage.getItem('userData'));
            
            if (locallyStoredData) {
                setToken(locallyStoredData.userToken);
                const userData = await fetchUserStatus(locallyStoredData.userToken);
                
                if (userData) {
                    setIsAuthenticated(true);
                    setUserData(userData)
                } else {
                    // Clear everything if we couldn't get user data
                    localStorage.removeItem('userData');
                    setToken(null);
                    setUserData(null);
                    setIsAuthenticated(false);
                }
            }
        };

        initializeAuth();
    }, []);
    

    const login = async (newToken) => {
        try {
            const userData = await fetchUserStatus(newToken);
    
            if (userData) {
                localStorage.setItem('userData', JSON.stringify({userToken: newToken}));
                setToken(newToken);
                setUserData(userData);
                setIsAuthenticated(true);
            } else {
                throw new Error('Failed to get user data');
            }
        } catch (error) {
            console.error('Error during login process:', error);
            setToken(null);
            setUserData(null);
            setIsAuthenticated(false);
            localStorage.removeItem('userData');
            throw error; // Re-throw to handle in calling function
        }
    };

    const logout = () => {
        localStorage.removeItem("userData");
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };
    
    const values = { token, isAuthenticated, login, logout, userData, setUserData};
    
    return (
        <AuthContext.Provider value={{ ...values }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

