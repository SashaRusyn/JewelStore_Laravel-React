import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import { useMessageContext } from './MessageContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();
    const [cart, setCart] = useState([]);

    const updateCart = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/my-carts', { user_id: id });
            setCart(response.data);
        } catch (error) {
            console.log(error);
            setMessage("Помилка з даними в кошику, будь ласка, перезавантажту сторінку (");
        }
    }

    useEffect(() => {
        updateCart();
    }, [id]);

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
