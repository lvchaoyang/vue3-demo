import axios from 'axios';
import store from '@/store';

const BASE_URL = '/api';
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})
service.interceptors.request.use((config) => {
    store.commit('setLoading', true);
    store.commit('setError', {status: false, message: ''});
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete config.headers['Authorization']
    }
    return config
}, error => {
    return Promise.reject(error);
})
service.interceptors.response.use((response) => {
    setTimeout(() => {
        store.commit('setLoading', false);
    })
    return response;
}, (e) => {
    const { error } = e.response.data;
    store.commit('setError', { status: true, message: error });
    store.commit('setLoading', false);
    return Promise.reject(error);
})

export default service;