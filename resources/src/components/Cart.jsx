import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ product }) => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();
    const { cart, updateCart } = useCartContext();

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const addToCartProduct = async () => {
        const isAdded = cart.some(cart => cart.product_id === product.id);

        if (isAdded) {
            setMessage("Цей продукт вже доданий в кошик");
            return;
        }

        if (quantity < 1) {
            setMessage('Мінімальна кількість замовлення продукту 1шт.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/carts', { user_id: Number(id), product_id: Number(product.id), quantity });

            if (response.data.is_added) {
                setMessage('Товар був доданий в кошик ;');
                await updateCart();
            } else {
                setMessage('Товар не був доданий в кошик (')
            }
        } catch (error) {
            console.log(error);
            setMessage("Сталася помилка. Товар не був доданий в корзину");
        }
    }

    const handleNavigate = (e) => {
        navigate(`/shop/${product.id}`);
    }

    return <form action="" method="post">
        <img src={`/uploaded_img/${product.photo}`} alt="" onClick={handleNavigate}></img>
        <div className="name" onClick={handleNavigate}>
            {product.name}
        </div>
        <div className="price" onClick={handleNavigate}>
            &#8372;
            {product.price}
        </div>
        <input type="number" min={1} value={quantity} name="decoration_amount" className="amount"></input>
        <input type="button" value="Додати до кошику" name="submit_add" className="btn" onClick={addToCartProduct}></input>
    </form>
}

export default Cart;