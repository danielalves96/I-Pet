import axios from 'axios';
import hostUrl from './constants'

const api = axios.create({
    baseURL:`${hostUrl}:3333`
})

export default api;