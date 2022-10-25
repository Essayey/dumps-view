import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { userApi } from './http/userApi';
import { Context } from '.';
import Footer from './components/Footer';

function App() {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('refresh_token')) {
            setLoading(false)
            return;
        };
        userApi.check().then(data => {
            console.log(data.sub)
            user.setUser(data.sub);
            user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return null;

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
