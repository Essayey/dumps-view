import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, authRoutes, guestRoutes, adminRoutes } from '../routes';

const AppRouter = () => {
    // MOCK
    const user = { isAuth: true, role: 'ADMIN' };


    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.component />} />
            )}
            {user.isAuth ?
                authRoutes.map(route =>
                    <Route path={route.path} key={route.path} element={<route.component />} />
                )
                :
                guestRoutes.map(route =>
                    <Route path={route.path} key={route.path} element={<route.component />} />
                )
            }
            {user.role === 'ADMIN' &&
                adminRoutes.map(route =>
                    <Route path={route.path} key={route.path} element={<route.component />} />
                )
            }

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )

}

export default AppRouter