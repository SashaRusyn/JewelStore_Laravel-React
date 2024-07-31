import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import styles from '../styles/adminStyles.module.css';
import axios from "axios";
import Message from "../components/UI/Message/Message";
import { useMessageContext } from "../context/MessageContext";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { setMessage } = useMessageContext();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/orders');
            setOrders(response.data);
        } catch (error) {
            setMessage('Перезавантажте сторінку');
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/orders/${id}`, { status: status });

            if (response.data.is_updated) {
                setMessage("Замовлення оновлено");
                fetchData();
            }
        } catch (error) {
            setMessage("Сталась помилка при оновлення (");
        }
    }

    const deleteOrder = async (id) => {
        if (!confirm('Справді хочете видалити товар?')) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/api/orders/${id}`);

            if (response.data.is_deleted) {
                setMessage("Замовлення видалено");
                fetchData();
            }
        } catch (error) {
            setMessage("Сталась помилка при видаленні (");
        }
    }

    return <div>
        <Message />
        <AdminHeader />
        <section className={styles.orders}>
            <h1 className={styles.title}>Всі замовлення</h1>
            <div className={styles.box_container}>
                {orders.length ? orders.map((order) => <div key={order.id} className={styles.order}>
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
                        <form action="" method="post">
                            <input type="hidden" name="id" value="<?php echo $order['id'] ?>"></input>
                            <select className={styles.search_name} name="update_payment_status" defaultValue={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} required>
                                <option value="Очікується">Очікується</option>
                                <option value="Відправлено">Відправлено</option>
                                <option value="Виконано">Виконано</option>
                            </select>
                            <a className={styles.delete_btn + ' ' + styles.once}
                                onClick={() => deleteOrder(order.id)}>&#10006;</a>
                        </form>
                    </span></p>
                </div>) : <div className={styles.empty}>Наразі у нас немає замовлень :(</div>}
            </div>
        </section>
    </div>
}

export default AdminOrdersPage;