import { ersClient } from "./ers-client";

export async function getAllReimbursements() {
    let response = await ersClient.get('/reimbursements');
    return await response.data;
}

export async function sumbitReimbursement(amount: number, description: string, author_id: number, reimb_type_id: number) {
    let response = await ersClient.post('/reimbursements', {amount, description, author_id, reimb_type_id});
    return await response.data;
}

export async function getReimbursementByUsername(username: string) {
    let response = await ersClient.get(`/reimbursements/${username}`);
    return await response.data;
}