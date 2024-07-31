import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Message from '../components/UI/Message/Message';

const AboutPage = () => {
    return <div>
        <Message />
        <Header />
        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Про нас</h3>
                <p><Link to="/">Головна</Link> / Про нас</p>
            </div>
        </section>
        <section className="about">
            <div className="flex">
                <div className="image">
                    <img src="/images/about-us.jpg"></img>
                </div>
                <div className="content">
                    <h3>Про нас</h3>
                    <p>Ювелірна мережа яка допоможе тобі здійснити найзаповідніші мрії. Ювелірна мережа Jewel - це
                        компанія, яка пропонує розкішні прикраси та ювелірні вироби. Jewel відома своїм
                        бездоганним дизайном, високою якістю матеріалів та майстерністю виготовлення. Основними аспектами,
                        які відрізняють Jewel, є елегантність, розкіш та індивідуальність.

                        <br></br>Jewel пропонує широкий асортимент прикрас, включаючи каблучки, намиста, сережки, кольє та
                        браслети.
                        Кожна прикраса створюється з надзвичайною увагою до деталей та використанням найкращих матеріалів,
                        таких як дорогоцінні камені, золото, срібло та платина.
                    </p>
                    <a href="contact.php" className="about-btn">Напишіть нам</a>
                </div>
            </div>
        </section>
        <section className="authors">
            <h1 className="title">Автори</h1>
            <div className="box-container">
                <div className="box">
                    <img src="images/profile.jpg"></img>
                    <h3>Sasha Rusyn</h3>
                </div>
                <div className="box">
                    <img src="images/profile.jpg"></img>
                    <h3>Sasha Rusyn</h3>
                </div>
                <div className="box">
                    <img src="images/profile.jpg"></img>
                    <h3>Sasha Rusyn</h3>
                </div>
            </div>
        </section>
        <Footer />
    </div>
};

export default AboutPage;