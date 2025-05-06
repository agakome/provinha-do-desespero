// IP da sua máquina na rede ou 'localhost' para web
import axios from 'axios'

export const api = axios.create({
    baseURL: "http://192.168.1.74:3000",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
})