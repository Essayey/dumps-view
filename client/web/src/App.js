import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { userApi } from './http/userApi';
import { Context } from '.';

function App() {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log()
        userApi.check().then(data => {
            console.log(data);
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return null;

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
