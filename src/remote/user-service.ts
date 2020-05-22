import { ersClient } from './ers-client';
import { User } from '../models/user';


export async function getAllUsers() {
    let response = await ersClient.get('/users');
    return await response.data;
}

export async function update(u: User) {
    let response = await ersClient.put('/users', {u});
    return await response.data;
}

export async function register(username: string, password: string, first_name: string, last_name: string, email: string) {
    let response = await ersClient.post('/users', {username, password, first_name, last_name, email});
    return await response.data;
} 

export async function logout() {
    let response = await ersClient.get('/auth');
    console.log(`response data: ${response.data}`)
    return await response.data;
}

// export async function deleteUserById(id: number) {
//     let response = await ersClient.delete('/users', {id});
//     return await response.data;
// }