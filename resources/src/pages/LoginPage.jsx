import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import Message from '../components/UI/Message/Message';
import { useMessageContext } from '../context/MessageContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useUserContext();
    const { setMessage } = useMessageContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        setMessage("");
        if (password.length < 8) {
            setMessage("Довжина паролю повинна бути більше 8 символів");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            if (response.data.authorized) {
                login(response.data.user.id, response.data.user.name, response.data.user.user_type, response.data.user.email);
                navigate("/");
            }
        } catch (error) {
            setMessage("Введено невірні дані");
            console.error(error);
        };
    }

    return <div>
        <Message />
        <div className="form-container">
            <form action="" method="get">
                <h3>автентифікація</h3>
                <input type="email" name="email" placeholder="Email" required className="box" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" name="password" placeholder="Пароль" required className="box" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="button" name="submit" value="Ввійти" className="btn" onClick={handleLogin}></input>
                <p>Ще немає акаунту? <Link to="../register">Зареєструватися зараз</Link></p>
            </form>
        </div ></div>;
};

export default LoginPage;