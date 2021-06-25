import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        headers: {
            authorization: localStorage.getItem('token'),
        },
        baseURL: 'https://pintereach-5.herokuapp.com/',
    });
};