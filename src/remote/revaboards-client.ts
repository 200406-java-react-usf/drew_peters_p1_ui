import axios from 'axios';

export const revaboardsClient = axios.create({
    baseURL: 'http://P1Api-env.eba-6w57avct.us-east-1.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    }
});