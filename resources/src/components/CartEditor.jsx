import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartEditor = ({ cart }) => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();
    const { updateCart } = useCartContext();

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(cart.quantity);

    const deleteFromCartProduct = async () => {
        if (!confirm('Справді хочете видалити товар з кошику?')) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/api/carts/${cart.id}`);

            if (response.data.is_deleted) {
                setMessage("Товар видалено з кошика");
                await updateCart();
            }
        } catch (error) {
            setMessage("Сталась помилка при видаленні (");
        }
    }

    const updateAmount = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/carts/${cart.id}`, { user_id: id, quantity: Number(quantity) });

            if (response.data.is_updated) {
                setMessage("Кількість оновлено");
                await updateCart();
            }
        } catch (error) {
            setMessage("Сталась помилка при оновленні кількості (");
        }
    }

    const handleNavigate = (e) => {
        navigate(`/shop/${cart.product_id}`);
    }

    return <div className="box-container">
        <button className="delete-btn once"
            onClick={deleteFromCartProduct}>&#10006;</button>
        <img src={`/uploaded_img/${cart.product.photo}`} alt="" onClick={handleNavigate}></img>
        <div className="name" onClick={handleNavigate}>
            {cart.product.name}
        </div>
        <div className="price" onClick={handleNavigate}>
            &#8372;
            {cart.product.price}
        </div>
        <form action="" method="post">
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                name="decoration_amount" className="amount"></input>
            <input type="button" value="Оновити кількість" name="submit_update" className="btn" onClick={updateAmount}></input>
        </form>
        <div className="sum-price">
            <p>Загальна сума: </p>
            {cart.product.price + ' x ' + cart.quantity + ': '}
            &#8372;
            {cart.product.price * cart.quantity}
        </div>
    </div>
    // <form action="" method="post">
    //     <img src={`/uploaded_img/${product.photo}`} alt=""></img>
    //     <div className="name">
    //         {product.name}
    //     </div>
    //     <div className="price">
    //         &#8372;
    //         {product.price}
    //     </div>
    //     <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} name="decoration_amount" className="amount"></input>
    //     <input type="button" value="Додати до кошику" name="submit_add" className="btn" onClick={addToCartProduct}></input>
    // </form>
}

export default CartEditor;