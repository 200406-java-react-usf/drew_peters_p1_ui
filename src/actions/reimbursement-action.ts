import { Dispatch } from "redux"
import { sumbitReimbursement } from "../remote/reimbursement-service";

export const reimbursementActionTypes = {
    SUCCESSFUL_SUBMIT: 'REIMB_SUCCESSFUL_SUMBIT',
    BAD_REQUEST: 'REIMB_BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'REIMB_INTERNAL_SERVER_ERROR'
}

export const reimbursementAction = (amount: number, description: string, author_id: number, reimb_type_id: number) => async (dispatch: Dispatch) => {

    try {
        let persistedReimb = await sumbitReimbursement(amount, description, author_id, reimb_type_id);
        dispatch({
            type: reimbursementActionTypes.SUCCESSFUL_SUBMIT,
            payload: persistedReimb
        });
    } catch (e) {
        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: reimbursementActionTypes.BAD_REQUEST,
                payload: e.response.data.reason
            });
        } else {
            dispatch({
                type: reimbursementActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh. We could not reach the server at this time.'
            });
        }
    }
}