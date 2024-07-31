import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Cart from "../components/Cart";
import Message from "../components/UI/Message/Message";
// import PageWrapper from "../components/PageWrapper";

const ShopPage = () => {
    const [searchName, setSearchName] = useState('');
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(99999999);
    const [searchCategory, setSearchCategory] = useState('Все');
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('time');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                await setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return ((searchName === '' || product.name.toLowerCase().includes(searchName.toLowerCase())) && (parseFloat(product.price) >= parseFloat(minPrice)) && (parseFloat(product.price) <= parseFloat(maxPrice)) && (searchCategory === 'Все' || product.type === searchCategory));
        });
    }, [searchName, minPrice, maxPrice, searchCategory, products]);

    const sortedProducts = useMemo(() => {
        switch (sortOption) {
            case 'min_price':
                return [...filteredProducts].sort((product1, product2) => product1.price - product2.price);
            case 'max_price':
                return [...filteredProducts].sort((product1, product2) => product2.price - product1.price);
            case 'min_name':
                return [...filteredProducts].sort((product1, product2) => { if (product1.name.toLowerCase() > product2.name.toLowerCase()) return 1; if (product1.name.toLowerCase() < product2.name.toLowerCase()) return -1; return 0 });
            case 'max_name':
                return [...filteredProducts].sort((product1, product2) => { if (product1.name.toLowerCase() < product2.name.toLowerCase()) return 1; if (product1.name.toLowerCase() > product2.name.toLowerCase()) return -1; return 0 });
            default:
                return [...filteredProducts];
        }
    }, [sortOption, filteredProducts]);

    return <div>
        <Message />
        <Header />
        <section className="home" style={{ minHeight: '30rem' }}>
            <div className="content">
                <h3>Магазин</h3>
                <p><Link to="/">Головна</Link> / Магазин</p>
            </div>
        </section>

        <section className="search-form">
            <form>
                <div>
                    <input className="search-name" type="text" name="search_name" placeholder="Пошук..." value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
                    <input className="about-btn" style={{ marginTop: '0' }} type="button" value="Пошук" name="submit"></input>
                </div>
                <div>
                    <input className="search-name" type="number" min="1" max="100000" value={minPrice} name="min_price" onChange={(e) => setMinPrice(Number(e.target.value))}></input>
                    <input className="search-name" type="number" min="1" max="100000" value={maxPrice} name="max_price" onChange={(e) => setMaxPrice(Number(e.target.value))}></input>
                    <select className="search-name" name="type" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                        <option value="Все">Все</option>
                        <option value="Каблучки">Каблучки</option>
                        <option value="Сережки">Сережки</option>
                        <option value="Ланцюжки">Ланцюжки</option>
                        <option value="Колье">Колье</option>
                        <option value="Підвіски">Підвіски</option>
                        <option value="Браслети">Браслети</option>
                        <option value="Хрестики">Хрестики</option>
                        <option value="Годинники">Годинники</option>
                    </select>
                    <select className="search-name" name="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value='time'>Найновіші</option>
                        <option value='min_name'>По назві від А до Я</option>
                        <option value='max_name'>По назві від Я до А</option>
                        <option value='min_price'>Від дешевних</option>
                        <option value='max_price'>Від дорожчих</option>
                    </select>
                </div>
            </form>
        </section>

        <section className="decorations">
            <div className="catalog">
                {filteredProducts.length > 0 ?
                    sortedProducts.map((product) => <li style={{ listStyle: "none" }} key={product.id}>
                        <Cart product={product}></Cart>
                    </li>) : <div className="empty">Наразі у нас немає такої продукції :{"("}</div>
                }
            </div>
        </section>
        <Footer />
    </div>
}

export default ShopPage;