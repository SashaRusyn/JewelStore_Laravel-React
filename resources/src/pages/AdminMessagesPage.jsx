import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import styles from '../styles/adminStyles.module.css';
import axios from "axios";
import { useMessageContext } from "../context/MessageContext";
import Message from "../components/UI/Message/Message";

const AdminMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const { setMessage } = useMessageContext();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/messages');
            setMessages(response.data);
        } catch (error) {
            setMessage('Перезавантажте сторінку');
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteMessage = async (id) => {
        if (!confirm('Справді хочете видалити повідомлення?')) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/api/messages/${id}`);

            if (response.data.is_deleted) {
                setMessage("Повідомлення видалено");
                fetchData();
            }
        } catch (error) {
            setMessage("Сталась помилка при видаленні (");
        }
    }

    return <div>
        <Message />
        <AdminHeader />
        <section className={styles.users}>
            <h1 className={styles.title}>Повідомлення</h1>
            <div className={styles.box_container}>
                {messages.length ? messages.map((message) => <div key={message.id} className={styles.user}>
                    <p>User Id: <span>
                        {message.user_id}
                    </span></p>
                    <p>Ім'я: <span>
                        {message.name}
                    </span></p>
                    <p>Email: <span>
                        {message.email}
                    </span></p>
                    <p>Номер телефону: <span>
                        {message.number}
                    </span></p>
                    <p>Повідомлення: <span>
                        {message.message}
                    </span></p>
                    <a className={styles.delete_btn}
                        onClick={() => deleteMessage(message.id)}>&#10006;</a>
                </div>) : <div className={styles.empty}>Наразі у нас немає повідомлень</div>}
            </div>
        </section>
    </div>
}

export default AdminMessagesPage;