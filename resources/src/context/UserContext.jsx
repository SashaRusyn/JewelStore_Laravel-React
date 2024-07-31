import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [type, setType] = useState(null);
    const [id, setId] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveToSessionStorage = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    const getFromSessionStorage = (key) => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    useEffect(() => {
        const storedIsAuth = getFromSessionStorage('isAuth');
        const storedUser = getFromSessionStorage('user');
        const storedType = getFromSessionStorage('type');
        const storedEmail = getFromSessionStorage('email');
        const storedId = getFromSessionStorage('id');

        if (storedIsAuth) setIsAuth(storedIsAuth);
        if (storedId) setId(storedId);
        if (storedUser) setUser(storedUser);
        if (storedType) setType(storedType);
        if (storedEmail) setEmail(storedEmail);
        setIsLoading(false);
    }, []);

    const login = (id, username, type, email) => {
        setIsAuth(true);
        setUser(username);
        setId(id);
        setType(type);
        setEmail(email);
        saveToSessionStorage('isAuth', true);
        saveToSessionStorage('user', username);
        saveToSessionStorage('id', id);
        saveToSessionStorage('type', type);
        saveToSessionStorage('email', email);
    };

    const logout = () => {
        setIsAuth(false);
        setId(null);
        setUser(null);
        setType(null);
        setEmail(null);
        sessionStorage.removeItem('isAuth');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('email');
    };

    return (
        <UserContext.Provider value={{ isAuth, type, id, user, email, isLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
