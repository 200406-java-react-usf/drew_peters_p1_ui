import { ersClient } from './ers-client';

export async function authenticate(username: string, password: string) {
    let response = await ersClient.post('/auth', {username, password});
    return await response.data;
}