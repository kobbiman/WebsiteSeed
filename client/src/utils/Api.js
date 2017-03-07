import axios from 'axios';
import environment from 'src/constants/environment';

export default function Api () {
    const getEndpoint = endpoint => environment.endpoints[endpoint];
    const host = environment.environments.api[environment.current];

    return {
        request (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.request(`${host}${relativePath}`, ...params);
        },
        get (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.get(`${host}${relativePath}`, ...params);
        },
        delete (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.delete(`${host}${relativePath}`, ...params);
        },
        head (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.head(`${host}${relativePath}`, ...params);
        },
        post (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.post(`${host}${relativePath}`, ...params);
        },
        put (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.put(`${host}${relativePath}`, ...params);
        },
        patch (endpoint, ...params) {
            const relativePath = getEndpoint(endpoint);

            return axios.patch(`${host}${relativePath}`, ...params);
        }
    }
}