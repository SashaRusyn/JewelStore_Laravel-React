import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import styles from '../styles/adminStyles.module.css';
import Message from "../components/UI/Message/Message";
import axios from "axios";
import { useMessageContext } from "../context/MessageContext";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const { setMessage } = useMessageContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                setMessage('Перезавантажте сторінку');
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return <div>
        <Message />
        <AdminHeader />
        <section className={styles.users}>
            <h1 className={styles.title}>Користувачі</h1>
            <div className={styles.box_container}>
                {users.length ? users.map((user) => <div key={user.id} className={styles.user}>
                    <p>Ім'я: <span>
                        {user.name}
                    </span></p>
                    <p>Email: <span>
                        {user.email}
                    </span></p>
                    <p>User id: <span>
                        {user.id}
                    </span></p>
                </div>) : <div className={styles.empty}>Наразі у нас немає користувачів :(</div>}
            </div>
        </section>
    </div>
}

export default AdminUsersPage;