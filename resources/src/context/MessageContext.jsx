import React, { createContext, useContext, useEffect, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState("");

    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => useContext(MessageContext);
