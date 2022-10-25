import { $host, $authHost } from "./index";

class UserApi {
    registration = async (username, password) => {
        const data = await $host.post('auth/user/registration?username=' + username + '&password=' + password);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        console.log(data)
        return data.access_token;
    }
}

export const userApi = new UserApi();