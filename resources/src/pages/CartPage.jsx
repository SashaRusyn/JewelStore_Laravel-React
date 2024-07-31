import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Message from "../components/UI/Message/Message";
import { useCartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartEditor from "../components/CartEditor";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";

const CartPage = () => {
    const { id } = useUserContext();
    const { cart, updateCart } = useCartContext();
    const { setMessage } = useMessageContext();

    const deleteAllFromCart = async () => {
        try {
            if (!confirm('Справді хочете очистити кошик ?')) {
                return;
            }

            await axios.post('http://localhost:8000/api/my-carts-clear', { user_id: id });
            setMessage('Кошик очищено');
            await updateCart();
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <Message />
        <Header />
        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Кошик</h3>
                <p><Link to="/home">Головна</Link> / Кошик</p>
            </div>
        </section>

        <section className="shopping-cart">
            <div className="catalog">
                {cart.length ? cart.map((cart) =>
                    <CartEditor key={cart.id} cart={cart}></CartEditor>
                ) : <div className="empty">Ви нічого не додали до вашого кошика</div>}
            </div>

            {cart.length ? <div className="delete-all" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a className="delete-btn" onClick={deleteAllFromCart}>Очистити кошик</a>
            </div> : ""}

            <div className="cart-total" style={{ border: 'none' }}>
                {cart.length ? <p>Загальна сума: &#8372;
                    {cart.reduce((sum, cart) =>
                        sum += Number(cart.product.price * cart.quantity)
                        , 0)}
                </p> : ""}
                <div className="flex">
                    <Link className="option-btn" to="/shop">Продовжити покупки</Link>
                    {cart.length ? <Link className="option-btn"
                        to="/checkout">Перейти до замовлення</Link> : ""}
                </div>
            </div>
        </section>
        <Footer />
    </div>
}

export default CartPage;