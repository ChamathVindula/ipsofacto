import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/api';
import { data } from 'react-router';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
          const res = await API.get('/api/me');
          setUser(res.data.user);
        } catch (err) {
          setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await API.post('/auth/login', { email, password });
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            return { status: response.status, data: response.data };
        } catch (err) {
            return { status: err.status, data: err.data };
        }
    };

    const register = async (first_name, last_name, email, password) => {
        try {
            const res = await API.post('/auth/register', { first_name, last_name, email, password });
            return { status: res.status };
        } catch (err) {
            return { status: err.status };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;