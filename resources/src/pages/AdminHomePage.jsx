import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import styles from '../styles/adminStyles.module.css';
import axios from "axios";
import Message from "../components/UI/Message/Message";
import { useMessageContext } from "../context/MessageContext";

const AdminHomePage = () => {
    const [info, setInfo] = useState({});
    const { setMessage } = useMessageContext();

    const fetchData = async () => {
        try {
            await setInfo((await axios.get('http://localhost:8000/api/report')).data);
        } catch {
            setMessage('Перезавантажте сторінку');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <div>
        <Message />
        <AdminHeader />
        <h1 className={styles.title}>Інформаційна дошка</h1>
        <section className={styles.dashboard}>
            <div className={styles.box_container}>
                <div className={styles.box}>
                    <h3>&#8372;
                        {info.total_pending_orders}
                    </h3>
                    <p>Сума замовлень з статусом "Очікується"</p>
                </div>
                <div className={styles.box}>
                    <h3>&#8372;
                        {info.total_sent_orders}
                    </h3>
                    <p>Сума замовлень з статусом "Відправлено"</p>
                </div>
                <div className={styles.box}>
                    <h3>&#8372;
                        {info.total_performed_orders}
                    </h3>
                    <p>Сума замовлень з статусом "Виконано"</p>
                </div>
                <div className={styles.box}>
                    <h3>{info.total_orders}</h3>
                    <p>Кількість всіх замовлень</p>
                </div>
                <div className={styles.box}>
                    <h3>
                        {info.total_products}
                    </h3>
                    <p>Кількість всіх доданих товарів</p>
                </div>
                <div className={styles.box}>
                    <h3>
                        {info.total_users}
                    </h3>
                    <p>Звичайних користувачів</p>
                </div>
                <div className={styles.box}>
                    <h3>
                        {info.total_admins}
                    </h3>
                    <p>Адмінів</p>
                </div>
                <div className={styles.box}>
                    <h3>
                        {info.total_messages}
                    </h3>
                    <p>Повідомлень</p>
                </div>
            </div>
        </section>
    </div >;
}

export default AdminHomePage;