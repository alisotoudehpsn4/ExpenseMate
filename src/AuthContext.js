import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from cookie:", error);
                Cookies.remove('user');
            }
        }
    }, []);

    const login = (userData, token) => {
        if (userData && token) {
            Cookies.set('user', JSON.stringify(userData));
            Cookies.set('token', token);
            setUser(userData);
        } else {
            console.error("Invalid user data or token");
        }
    };

    const logout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
