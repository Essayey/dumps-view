import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '..';
import { publicRoutes, authRoutes, guestRoutes, adminRoutes } from '../routes';

const AppRouter = observer(() => {
    // MOCK
    const { user } = useContext(Context);

    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.component />} />
            )}
            {user.isAuth ?
                <Fragment>
                    {authRoutes.map(route =>
                        <Route path={route.path} key={route.path} element={<route.component />} />
                    )
                    }
                    {user.user.role === 'Admin' &&
                        adminRoutes.map(route =>
                            <Route path={route.path} key={route.path} element={<route.component />} />
                        )
                    }
                </Fragment>
                :
                guestRoutes.map(route =>
                    <Route path={route.path} key={route.path} element={<route.component />} />
                )
            }


            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
})

export default AppRouter