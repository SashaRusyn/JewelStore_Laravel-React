import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Message from "../components/UI/Message/Message";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import axios from "axios";

const OrdersPage = () => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/my-orders', { user_id: id });
                setOrders(response.data);
            } catch (error) {
                console.log(error);
                setMessage('Сталась помилка, будь ласка оновіть сторінку');
            }
        }

        fetchData();
    }, [])

    return <div>
        <Message />
        <Header />

        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Замовлення</h3>
                <p><Link to="/">Головна</Link> / Замовлення</p>
            </div>
        </section>

        <section>
            <h1 className="title">Ваші замовлення</h1>

            <div className="orders">
                {orders.length ? orders.map((order) => <div className="order">
                    <p>Зроблене: <span>
                        {order.created_at}
                    </span></p>
                    <p>Ваше ім'я: <span>
                        {order.name}
                    </span></p>
                    <p>Телефон: <span>
                        {order.phone}
                    </span></p>
                    <p>Email: <span>
                        {order.email}
                    </span></p>
                    <p>Адреса: <span>
                        {order.address}
                    </span></p>
                    <p>Спосіб оплати: <span>
                        {order.method}
                    </span></p>
                    <p>Ваше замовлення: <span>
                        {order.total_products}
                    </span></p>
                    <p>Сумарна вартість: <span>&#8372;
                        {order.total_price}
                    </span></p>
                    <p>Статус замовлення: <span>
                        {order.status}
                    </span></p>
                </div>) : <div className="empty">Список ваших замовлень порожній</div>}
            </div>
        </section>

        <Footer />
    </div>
}

export default OrdersPage;