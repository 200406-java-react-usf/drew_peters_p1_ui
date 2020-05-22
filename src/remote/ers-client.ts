import axios from 'axios';

export const ersClient = axios.create({
    baseURL: 'http://p1api-env.eba-6w57avct.us-east-1.elasticbeanstalk.com/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});