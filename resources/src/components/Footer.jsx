import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Footer = () => {
    return <section className="footer">

        <div className="box-container">

            <div className="box">
                <h3>Посилання на</h3>
                <Link to="/">Головна</Link>
                <Link to="/about">Про нас</Link>
                <Link to="/shop">Магазин</Link>
                <Link to="/contact">Контакти</Link>
            </div>

            <div className="box">
                <h3>Посилання на</h3>
                <Link to="/login">Вхід</Link>
                <Link to="/register">Реєстрація</Link>
                <Link to="/cart">Кошик</Link>
                <Link to="/orders">Замовлення</Link>
            </div>

            <div className="box">
                <h3>Наші контакти</h3>
                <p> <i className="fas fa-phone"></i> +123-456-7890 </p>
                <p> <i className="fas fa-phone"></i> +111-222-3333 </p>
                <p> <i className="fas fa-envelope"></i> sasharusyn11@gmail.com </p>
                <p> <i className="fas fa-map-marker-alt"></i> uzhhorod, ukraine - 400104 </p>
            </div>

            <div className="box">
                <h3>Ми в соц мережах</h3>
                <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
                <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
                <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
                <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
            </div>

        </div>

        <p className="credit"> &copy; copyright @
            2024 by <span>Sasha Rusyn</span>
        </p>

    </section>
}

export default Footer;