import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        const token = Cookies.get('token');
        console.log("Checking cookies on load:", { storedUser, token });

        if (storedUser && token) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log("User and token successfully loaded from cookies:", { parsedUser, token });
            } catch (error) {
                console.error("Error parsing user from cookie:", error);
                Cookies.remove('user');
                Cookies.remove('token');
            }
        } else {
            console.log("No user or token found in cookies");
        }
        setLoading(false); // Ensure loading state is set to false
    }, []);

    const login = (userData, token) => {
        if (userData && token) {
            Cookies.set('user', JSON.stringify(userData), { expires: 7 });
            Cookies.set('token', token, { expires: 7 });
            setUser(userData);
            console.log("User and token set in cookies and state:", { userData, token });
        } else {
            console.error("Invalid user data or token");
        }
    };

    const logout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        setUser(null);
        console.log("User and token removed from cookies and state");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
