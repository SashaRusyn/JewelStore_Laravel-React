import { Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ContactPage from "../pages/ContactPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import ProductPage from "../pages/ProductPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import AdminHomePage from "../pages/AdminHomePage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminMessagesPage from "../pages/AdminMessagesPage";

export const publicRouters = [
    { path: "/login", element: <LoginPage />, exact: true },
    { path: "/register", element: <RegisterPage />, exact: true },
    { path: "*", element: <ErrorPage />, exact: true }
]

export const userRouters = [
    ...publicRouters,
    { path: "/", element: <HomePage />, exact: true },
    { path: "/about", element: <AboutPage />, exact: true },
    { path: "/shop", element: <ShopPage />, exact: true },
    { path: "/shop/:id", element: <ProductPage />, exact: true },
    { path: "/contact", element: <ContactPage />, exact: true },
    { path: "/cart", element: <CartPage />, exact: true },
    { path: "/checkout", element: <CheckoutPage />, exact: true },
    { path: "/orders", element: <OrdersPage />, exact: true },
]

export const adminRouters = [
    ...publicRouters,
    { path: "/", element: <AdminHomePage />, exact: true },
    { path: "/products", element: <AdminProductsPage />, exact: true },
    { path: "/orders", element: <AdminOrdersPage />, exact: true },
    { path: "/users", element: <AdminUsersPage />, exact: true },
    { path: "/messages", element: <AdminMessagesPage />, exact: true },
]