import axios from 'axios';
import hostUrl from "./constants"

const api = axios.create({
    baseURL:`${hostUrl}:5432`
})

export default api;