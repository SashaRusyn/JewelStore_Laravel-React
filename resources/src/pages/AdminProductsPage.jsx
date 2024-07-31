import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Message from "../components/UI/Message/Message";
import { useMessageContext } from "../context/MessageContext";
import axios from "axios";
import styles from '../styles/adminStyles.module.css';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const { setMessage } = useMessageContext();
    const ref = useRef();

    const [addName, setAddName] = useState('');
    const [addDesc, setAddDesc] = useState('');
    const [addPrice, setAddPrice] = useState(1);
    const [addPhoto, setAddPhoto] = useState('');
    const [addType, setAddType] = useState('Каблучки');

    const [updateId, setUpdateId] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState(null);

    const [updateName, setUpdateName] = useState('');
    const [updateDesc, setUpdateDesc] = useState('');
    const [updatePrice, setUpdatePrice] = useState(1);
    const [updatePhoto, setUpdatePhoto] = useState('');
    const [updateType, setUpdateType] = useState('Каблучки');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            setMessage('Перезавантажте сторінку')
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const productItem = products.find((product) => product.id === updateId);
        if (productItem) {
            setUpdateName(productItem.name);
            setUpdateDesc(productItem.description);
            setUpdatePrice(Number(productItem.price));
            setUpdateType(productItem.type);
            setUpdatePhoto(productItem.photo);
        }
    }, [updateId]);

    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/products', { name: addName, description: addDesc, price: addPrice, photo: addPhoto, type: addType });

            if (response.data.is_added) {
                setMessage('Товар був доданий');
                setAddName('');
                setAddDesc('');
                setAddPrice(1);
                setAddPhoto('');
                setAddType('Каблучки');
            }
        } catch (error) {
            console.log(error);
            setMessage('Сталася помилка при додаванні');
        }

        fetchData();
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/products/${id}`);

            if (response.data.is_deleted) {
                setMessage('Товар був видалений');
            }
        } catch (error) {
            console.log(error);
            setMessage('Сталася помилка при видаленні товару');
        }

        fetchData();
    }

    const updateProduct = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/products/${updateId}`, { name: updateName, description: updateDesc, price: updatePrice, photo: updatePhoto, type: updateType });

            if (response.data.is_updated) {
                setMessage('Товар оновлено');
            }
        } catch (error) {
            console.log(error);
            setMessage('Сталася помилка при оновленні товару');
        }

        fetchData();
    }

    return <div>
        <Message />
        <AdminHeader />
        <section className={styles.add_products}>
            <h1 className={styles.title}>Прикраси</h1>
            <form>
                <h3>Додати продукт</h3>
                <input type="text" name="name" placeholder="Назва прикраси" value={addName} onChange={(e) => setAddName(e.target.value)} required></input>
                <textarea type="text" name="description" placeholder="Опис прикраси" value={addDesc} onChange={(e) => setAddDesc(e.target.value)} required></textarea>
                <input type="number" min="1" name="price" placeholder="Ціна прикраси" value={addPrice} onChange={(e) => setAddPrice(Number(e.target.value))} required></input>
                <select className={styles.search_name} name="type" value={addType} onChange={(e) => setAddType(e.target.value)} required>
                    <option value="Каблучки">Каблучки</option>
                    <option value="Сережки">Сережки</option>
                    <option value="Ланцюжки">Ланцюжки</option>
                    <option value="Колье">Колье</option>
                    <option value="Підвіски">Підвіски</option>
                    <option value="Браслети">Браслети</option>
                    <option value="Хрестики">Хрестики</option>
                    <option value="Годинники">Годинники</option>
                </select>
                <input type="text" name="photo" placeholder="Шлях до фото прикраси" value={addPhoto} onChange={(e) => setAddPhoto(e.target.value)} required></input>
                <input type="button" value="Додати прикрасу" name="submit_add_product" className={styles.about_btn} onClick={addProduct}></input>
            </form>
        </section>

        <section className={styles.show_decorations}>
            <div className={styles.catalog}>
                {products.length ? products.map((product) => <div key={product.id} className={styles.box_container}>
                    <a className={styles.delete_btn + ' ' + styles.once}
                        onClick={() => deleteProduct(product.id)}>&#10006;</a>
                    <img src={`uploaded_img/${product.photo}`} alt=""></img>
                    <div className={styles.name}>
                        {product.name}
                    </div>
                    <div className={styles.name}>
                        {product.description}
                    </div>
                    <div className={styles.price}>
                        &#8372;
                        {product.price}
                    </div>
                    <a className={styles.option_btn} onClick={() => { ref.current.style.display = 'flex'; setUpdateId(product.id); }}>Оновити</a>
                </div>) : <div className={styles.empty}>Немає ніяких продуктів</div>}
            </div>
        </section>

        <section className={styles.edit_product_form} style={{ display: 'none' }} ref={ref}>
            <form>
                <img src={`uploaded_img/${updatePhoto}`} alt=""></img>
                <input type="text" name="update_name" className={styles.box} required placeholder="Введіть нову назву прикраси" value={updateName} onChange={(e) => setUpdateName(e.target.value)}></input>
                <textarea type="text" name="update_name" className={styles.box} required placeholder="Введіть нову назву прикраси" value={updateDesc} onChange={(e) => updateDesc(e.target.value)} ></textarea>
                <input type="number" name="update_price" min="1" className={styles.box} required placeholder="Введіть нову ціну" value={Math.floor(updatePrice)} onChange={(e) => setUpdatePrice(Number(e.target.value))}></input>
                <input type="text" className={styles.box} name="update_image" placeholder="Новий шлях до фото" value={updatePhoto} onChange={(e) => setUpdatePhoto(e.target.value)}></input>
                <select className={styles.search_name} value={updateType} onChange={(e) => setUpdateType(e.target.value)} name="update_type" required>
                    <option value="Каблучки">Каблучки</option>
                    <option value="Сережки">Сережки</option>
                    <option value="Ланцюжки">Ланцюжки</option>
                    <option value="Колье">Колье</option>
                    <option value="Підвіски">Підвіски</option>
                    <option value="Браслети">Браслети</option>
                    <option value="Хрестики">Хрестики</option>
                    <option value="Годинники">Годинники</option>
                </select>
                <input type="button" value="Оновити" name="submit_update_product" className={styles.btn} onClick={updateProduct}></input>
                <input type="reset" value="Відмінити" id="close-update" className={styles.option_btn} onClick={() => { ref.current.style.display = 'none' }}></input>
            </form>
        </section>
    </div >
}

export default AdminProductsPage;