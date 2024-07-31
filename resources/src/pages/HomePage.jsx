import React, { useEffect, useState } from 'react';
import Message from '../components/UI/Message/Message';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import Cart from '../components/Cart';

const HomePage = () => {
    const navigate = useNavigate();
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/latests');
                setLatestProducts(response.data);
            } catch (error) {
                console.error(error);
            };
        };

        fetchLatest();
    }, [])

    return <div>
        <Message />
        <Header />
        <section className="home">
            <div className="content">
                <h3>Створюємо моменти вічності</h3>
                <p>Ювелірна мережа, де мрії стають реальністю</p>
                <Link className="about-btn" to="/about">Дізнатися більше</Link>
            </div>
        </section>
        <section className="decorations">
            <h3 className="title">Останні пропозиції</h3>
            <div className="catalog">
                {latestProducts.length > 0 ?
                    latestProducts.map((product) => <div key={product.id}>
                        <Cart product={product}></Cart>
                    </div>) : <div className="empty">Наразі у нас немає продукції :{"("}</div>
                }
            </div>
            <div className="load">
                <Link to="/shop" className="option-btn">Більше прикрас</Link>
            </div>
        </section>
        <section className="about">
            <div className="flex">
                <div className="image">
                    <img src="/images/about-us.jpg"></img>
                </div>
                <div className="content">
                    <h3>Про нас</h3>
                    <p>Ювелірна мережа яка допоможе тобі здійснити найзаповідніші мрії</p>
                    <Link to="/about" className="about-btn">Читати більше</Link>
                </div>
            </div>
        </section>
        <section className="home-contact">
            <div className="content">
                <h3>У вас є питання до нас?</h3>
                <p>Тоді напишіть нашій технічній підтримці і ми допоможемо вирішити вашу проблему</p>
                <Link to="/contact" className="option-btn">Напиши нам</Link>
            </div>
        </section>
        <Footer />
    </div>
};

export default HomePage;