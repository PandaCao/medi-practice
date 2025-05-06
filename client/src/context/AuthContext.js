import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kontrola, zda je uživatel přihlášen při načtení aplikace
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Jednoduchá autentizace pro školní projekt
        let userData = null;

        if (username === 'doktor' && password === 'doktor') {
            userData = {
                id: 1,
                username: 'doktor',
                role: 'doctor',
                name: 'MUDr. Jan Suk',
                title: 'Praktický lékař',
            };
        } else if (username === 'sestra' && password === 'sestra') {
            userData = {
                id: 2,
                username: 'sestra',
                role: 'nurse',
                name: 'Bc. Marie Nováková',
                title: 'Zdravotní sestra',
            };
        }

        if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
