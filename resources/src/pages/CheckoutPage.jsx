import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/UI/Message/Message';
import { useCartContext } from '../context/CartContext';
import { useMessageContext } from '../context/MessageContext';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const CheckoutPage = () => {
    const { id, email } = useUserContext();
    const { cart, updateCart } = useCartContext();
    const { setMessage } = useMessageContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [payloadMethod, setPayloadMethod] = useState('Готівниковий платіж');

    const address = useMemo(() => `Область: ${area}, район: ${district}, населений пункт: ${city}`, [area, district, city]);

    const totalProducts = useMemo(() => cart.reduce((info, cart) =>
        info += `${cart.product.name} x ${cart.quantity}. \n`
        , ""), [cart]);

    const totalPrice = useMemo(() => cart.reduce((sum, cart) =>
        sum += Number(cart.product.price * cart.quantity)
        , 0), [cart]);

    useEffect(() => {
        if (!cart.length) {
            navigate('/shop');
        }
    }, []);

    const makeCheckout = async () => {
        if (!(name && phone && email && area && district && city && payloadMethod)) {
            setMessage('Присутні пусті поля');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/orders', { user_id: id, name, email, phone, method: payloadMethod, total_price: totalPrice, total_products: totalProducts, address, status: 'Очікується' });

            if (response.data.ordered) {
                setMessage('Замовлення було офрмленно ;');
                await axios.post('http://localhost:8000/api/my-carts-clear', { user_id: id });
                updateCart();
                navigate('/');
            } else {
                setMessage('Помилка, замовлення не було оформлено ;');
            }
        } catch (error) {
            console.log(error);
            setMessage("Замовлення не було оформлено (");
        }
    }

    return <div>
        <Message />
        <Header />
        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Оформлення замовлення</h3>
                <p><Link to="/home">Головна</Link> / <Link to="/cart">Кошик</Link> / Оформлення замовлення</p>
            </div>
        </section>
        <section className="display-order">
            {cart.map((cart) => <p key={cart.id}>{`${cart.product.name} (`} &#8372; {cart.product.price} &#10006; {`${cart.quantity} )`}</p>)}
            <div className="grand-total">Загальна сума: &#8372; {totalPrice}</div>
        </section>
        <section className="checkout">
            <form action="" method="post">
                <h3>Розмістіть своє оголошення</h3>
                <div className="flex">
                    <div className="inputBox">
                        <span>Ваше ім'я :</span>
                        <input type="text" name="name" required="" placeholder="Введіть ваше ім'я" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="inputBox">
                        <span>Ваш номер телефону :</span>
                        <input type="text" name="number" required="" placeholder="Введіть ваш номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>
                    <div className="inputBox">
                        <span>Ваша область :</span>
                        <input type="text" name="state" required="" placeholder="Введіть вашу область" value={area} onChange={(e) => setArea(e.target.value)}></input>
                    </div>
                    <div className="inputBox">
                        <span>Ваш район :</span>
                        <input type="text" name="district" required="" placeholder="Введіть ваш район" value={district} onChange={(e) => setDistrict(e.target.value)}></input>
                    </div>
                    <div className="inputBox">
                        <span>Ваш населений пункт :</span>
                        <input type="text" name="locality" required="" placeholder="Введіть ваш населений пункт" value={city} onChange={(e) => setCity(e.target.value)}></input>
                    </div>
                    <div className="inputBox">
                        <span>Вид оплати :</span>
                        <select name="method" value={payloadMethod} onChange={(e) => setPayloadMethod(e.target.value)}>
                            <option value="Готівниковий платіж">Готівковий платіж</option>
                            <option value="Кредитна карта">Кредитна карта</option>
                            <option value="PayPal">PayPal</option>
                            <option value="GooglePay">GooglePay</option>
                            <option value="ApplePay">ApplePay</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <span>Підтвердіть замовлення :</span>
                        <input type="button" value="Замовити зараз" className="about-btn" name="submit" onClick={makeCheckout}></input>
                    </div>
                </div>
            </form>
        </section>
        <Footer />
    </div >
};

export default CheckoutPage;