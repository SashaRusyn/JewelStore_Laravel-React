import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/UI/Message/Message';
import { useMessageContext } from '../context/MessageContext';

const RegisterPage = () => {
    const { setMessage } = useMessageContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleCheckEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/check-email', { email });
            return response.data.exists;
        } catch (error) {
            console.error(error.response.data);
            return true;
        }
    }

    const handleRegister = async () => {
        setMessage("");
        if (confirmPass != password) {
            setMessage("Паролі  не збігаються!");
            return;
        }

        if (password.length < 8) {
            setMessage("Довжина паролю повинна бути більше 8 символів");
            return;
        }

        if (!(await handleCheckEmail())) {
            try {
                const response = await axios.post('http://localhost:8000/api/users', { name, email, password });
                if (response.data.created) {
                    setMessage("Профіль було створено");
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
            };
        } else {
            setMessage("Дана пошта вже зареєстрована!");
        }
    }

    return <div>
        <Message />
        <div className="form-container">

            <form>
                <h3>реєстрація</h3>
                <input type="email" name="email" placeholder="Email" required className="box" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" name="name" placeholder="Ваше ім'я" required className="box" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="password" name="password" placeholder="Пароль" required className="box" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" name="cpassword" placeholder="Підтвердження паролю" required className="box" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}></input>
                <input type="button" name="submit" value="Зареєструватися" className="btn" onClick={handleRegister}></input>
                <p>Вже є акаунт? <Link to="../login">Увійти в акаунт</Link></p>
            </form>

        </div></div>;
};

export default RegisterPage;