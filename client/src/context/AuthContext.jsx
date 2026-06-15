import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'jass-food-auth';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch (error) {
            console.warn('Unable to restore auth state', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        const nextUser = {
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
        };
        setUser(nextUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
