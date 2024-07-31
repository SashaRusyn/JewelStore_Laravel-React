import React from 'react';
import { UserProvider } from './UserContext';
import { MessageProvider } from './MessageContext';
import { CartProvider } from './CartContext';

const AppContext = ({ children }) => {
    return (
        <UserProvider>
            <MessageProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </MessageProvider>
        </UserProvider>
    );
};

export default AppContext;
