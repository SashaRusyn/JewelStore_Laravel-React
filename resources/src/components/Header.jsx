import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";
import { useMessageContext } from "../context/MessageContext";

const Header = () => {
    const navigate = useNavigate();
    const { logout, user, email } = useUserContext();
    const { cart } = useCartContext();
    const { message } = useMessageContext();

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

    const userBox = useRef(null);
    const navbar = useRef(null);

    window.onscroll = () => {
        userBox.current.classList.remove('active');
        navbar.current.classList.remove('active');

        if (window.scrollY > 80 && !message) {
            document.querySelector('.header .header-2').classList.add('active');
        } else {
            document.querySelector('.header .header-2').classList.remove('active');
        }
    }

    return <div>
        <header className="header">

            <div className="header-1">
                <div className="flex">
                    <div className="share">
                        <a href="#" className="fab fa-facebook-f"></a>
                        <a href="#" className="fab fa-twitter"></a>
                        <a href="#" className="fab fa-instagram"></a>
                        <a href="#" className="fab fa-linkedin"></a>
                    </div>
                    <p><Link to="/login">Вхід</Link> | <Link to="/register">Реєстрація</Link> </p>
                </div>
            </div>

            <div className="header-2">
                <div className="flex">
                    <Link to="/" className="logo">
                        <p className="fa-regular fa-gem"></p>Jewel
                    </Link>

                    <nav className={clickedMenu ? "navbar active" : "navbar"} ref={navbar}>
                        <Link to="/">Головна</Link>
                        <Link to="/about">Про нас</Link>
                        <Link to="/shop">Магазин</Link>
                        <Link to="/contact">Контакти</Link>
                        <Link to="/orders">Замовлення</Link>
                    </nav>

                    <div className="icons">
                        <div id="menu-btn" className="fas fa-bars" onClick={clickMenu}></div>
                        <Link to="/shop" className="fas fa-search"></Link>
                        <div id="user-btn" className="fas fa-user" onClick={clickUser}></div>
                        <Link to="/cart"> <i className="fas fa-shopping-cart"></i> <span>({cart.length})</span></Link>
                    </div>

                    <div className={clickedUser ? "user-box active" : "user-box"} ref={userBox}>
                        <p>Ім'я : <span>
                            {user}
                        </span></p>
                        <p>Email : <span>
                            {email}
                        </span></p>
                        <a className="delete-btn" onClick={() => { logout(); navigate('/login') }}>Вихід</a>
                    </div>
                </div>
            </div >

        </header >
    </div>
}

export default Header;