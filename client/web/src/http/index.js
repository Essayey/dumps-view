import axios from 'axios'

const $host = axios.create({
    baseURL: 'https://losharik27.pythonanywhere.com/'
})

const $authHost = axios.create({
    baseURL: 'https://losharik27.pythonanywhere.com/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host, $authHost
}