import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import AppContext from '../src/context/AppContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../src/context/UserContext';
import { adminRouters, publicRouters, userRouters } from '../src/router';

const App = () => {
    const { isAuth, type, isLoading } = useUserContext();

    return <BrowserRouter>
        {!isLoading ? <Routes Routes >
            {
                publicRouters.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.element}
                    />
                )
            }
            {
                isAuth ? (type === 'user' ? userRouters.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.element}
                    />
                ) : adminRouters.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.element}
                    />)) : <Route path='/' element={<Navigate to='/login' />} exact={true}></Route>
            }
        </Routes> : ''}
    </BrowserRouter>
}


ReactDOM.createRoot(document.getElementById('app')).render(<AppContext><App /></AppContext>);
