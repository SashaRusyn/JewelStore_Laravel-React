import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import styles from '../styles/adminStyles.module.css';

const AdminHeader = () => {
    const { user, email, logout } = useUserContext();

    const [clickedMenu, setClickedMenu] = useState(false);
    const [clickedUser, setClickedUser] = useState(false);

    const clickMenu = () => {
        setClickedUser(false);
        setClickedMenu(!clickedMenu);
    }

    const clickUser = () => {
        setClickedMenu(false);
        setClickedUser(!clickedUser);
    }

    return <header className={styles.header}>
        <div className={styles.flex}>

            <Link to="/" className={styles.logo}>Admin<span>Panel</span></Link>

            <nav className={clickedMenu ? (styles.navbar + " " + styles.active) : (styles.navbar)}>
                <Link to="/">Головна</Link>
                <Link to="/products">Прикраси</Link>
                <Link to="/orders">Замовлення</Link>
                <Link to="/users">Користувачі</Link>
                <Link to="/messages">Повідомлення</Link>
            </nav>

            <div className={styles.icons}>
                <div id={styles.menu_btn} className="fas fa-bars" onClick={clickMenu}></div>
                <div id={styles.user_btn} className="fas fa-user" onClick={clickUser}></div>
            </div>

            <div className={clickedUser ? (styles.account_box + " " + styles.active) : (styles.account_box)}>
                <p>username : <span>
                    {user}
                </span></p>
                <p>email : <span>
                    {email}
                </span></p>
                <Link className={styles.delete_btn} style={{ marginBottom: '1rem' }} onClick={logout}>logout</Link>
                <div><Link to="/login">login</Link> | <Link to="/register">register</Link></div>
            </div>

        </div>
    </header>
}

export default AdminHeader;