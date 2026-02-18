// contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        const authVerify = "";
        const token = localStorage.getItem('token');
        if (token) {
            authService.getProfile()
                .then(data => setUser(data.user))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        //localStorage.setItem('token', data.token);
        //setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const getUserInfo = async (userid) => {
        const data = await authService.getUserInfo(userid);
        if (data) {
            setUserinfo(data);
        }
        return data;
    }

    return (
        <AuthContext.Provider value={{
            user, loading, isAuthenticated: !!user, userinfo,
            login, register, logout, getUserInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
}