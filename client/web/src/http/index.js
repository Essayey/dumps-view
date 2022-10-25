import axios from 'axios'

const $host = axios.create({
    baseURL: 'https://losharik1713.pythonanywhere.com/'
})

const $authHost = axios.create({
    baseURL: 'https://losharik1713.pythonanywhere.com/'
})

const $refreshHost = axios.create({
    baseURL: 'https://losharik1713.pythonanywhere.com/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
}
const refreshInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('refresh_token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$refreshHost.interceptors.request.use(refreshInterceptor)
export {
    $host, $authHost, $refreshHost
}