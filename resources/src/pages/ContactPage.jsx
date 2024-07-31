import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { useMessageContext } from "../context/MessageContext";
import Message from "../components/UI/Message/Message";

const ContactPage = () => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [yourMessage, setYourMessage] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/messages', { user_id: Number(id), name, email, number, message: yourMessage });
            if (response.data.is_sent) {
                setMessage('Ваше повідомлення було надіслано ;');
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setMessage('Ваше повідомлення не було надіслане (');
        }
    }

    return <div>
        <Message />
        <Header />

        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Контакти</h3>
                <p><Link to="/">Головна</Link> / Контакти</p>
            </div>
        </section>

        <section className="contact">
            <form action="" method="post">
                <h3>Опишіть нам свою проблему</h3>
                <div className="inputBox">
                    <span>Ваше ім'я :</span>
                    <input type="text" name="name" required="" placeholder="Введіть ваше ім'я" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="inputBox">
                    <span>Ваш email :</span>
                    <input type="email" name="email" required="" placeholder="Введіть ваш email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="inputBox">
                    <span>Ваш номер телефону :</span>
                    <input type="text" name="number" required="" placeholder="Введіть ваш номер телефону" value={number} onChange={(e) => setNumber(e.target.value)}></input>
                </div>
                <div className="inputBox">
                    <span>Ваше питання :</span>
                    <textarea type="text" name="message" required="" placeholder="Опишіть вашу проблему" value={yourMessage} onChange={(e) => setYourMessage(e.target.value)}></textarea>
                </div>
                <input type="button" value="Надіслати" className="about-btn" name="submit" onClick={sendMessage}></input>
            </form>
        </section>

        <Footer />
    </div>
}

export default ContactPage;