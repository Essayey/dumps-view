import { $host, $authHost, $refreshHost } from "./index";
import jwt_decode from 'jwt-decode'

class UserApi {
    registration = async (username, password) => {
        const data = await $host.post('auth/user/registration', { username, password })
            .then(req => req.data);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        return jwt_decode(data.access_token);
    }
    login = async (username, password) => {
        const data = await $host.post('auth/user/login', { username, password })
            .then(req => req.data);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        return jwt_decode(data.access_token);
    }
    check = async () => {
        const data = await $refreshHost.put('auth/user/login')
            .then(req => req.data);
        localStorage.setItem('access_token', data.token);
        return jwt_decode(data.access_token);
    }
}

export const userApi = new UserApi();