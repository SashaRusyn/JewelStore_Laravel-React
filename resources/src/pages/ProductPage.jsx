import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Message from "../components/UI/Message/Message";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import { useCartContext } from "../context/CartContext";

const ProductPage = () => {
    const { id } = useUserContext();
    const { setMessage } = useMessageContext();
    const { cart, updateCart } = useCartContext();

    const [quantity, setQuantity] = useState(1);

    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`http://localhost:8000/api/products/${params.id}`);
            setData(response.data);
        }

        fetchData();
    }, []);

    const addToCartProduct = async () => {
        const isAdded = cart.some(cart => cart.product_id === product.id);

        if (isAdded) {
            setMessage("Цей продукт вже доданий в кошик");
            return;
        }

        if (quantity < 1) {
            setMessage('Мінімальна кількість замовлення продукту 1шт.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/carts', { user_id: Number(id), product_id: Number(data.id), quantity });

            if (response.data.is_added) {
                setMessage('Товар був доданий в кошик ;');
                await updateCart();
            } else {
                setMessage('Товар не був доданий в кошик (')
            }
        } catch (error) {
            console.log(error);
            setMessage("Сталася помилка. Товар не був доданий в корзину");
        }
    }

    return <div>
        <Message />
        <Header />
        <section className="product">
            {data ? <form action="" method="post">
                <img src={`/uploaded_img/${data.photo}`} alt=""></img>
                <div className="info" style={{ display: 'flex' }}>
                    <div>
                        <div className="name">{data.name}</div>
                        <div className="name">{data.description}</div>
                    </div>
                    <div className="inputs">
                        <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} name="decoration_amount" className="amount"></input>
                        <input type="button" value="Додати до кошику" name="submit_add" className="btn" onClick={addToCartProduct}></input>
                    </div>
                </div>
                <div className="price">
                    &#8372;
                    {data.price}
                </div>
            </form> : ""}
        </section>
        <Footer />
    </div>
}

export default ProductPage;